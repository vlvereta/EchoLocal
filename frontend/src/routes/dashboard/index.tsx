import { h, FunctionalComponent, Fragment } from "preact";
import { useCallback, useEffect, useMemo, useState } from "preact/hooks";

import {
  getProjectFromOrganization,
  getTranslationFromOrganization,
  removeProjectFromOrganization,
  removeTranslationFromOrganizationProject,
  setTranslationToOrganizationProject,
} from "../../utils";
import ProjectSettings from "./ProjectSettings";
import MainContentBlock from "./MainContentBlock";
import { useProject } from "../../hooks/useProject";
import { useAuth } from "../../components/AuthContext";
import { getOrganization } from "../../api/organizations";
import OrganizationSettings from "./OrganizationSettings";
import { useTranslation } from "../../hooks/useTranslation";
import { ExtendedOrganization, Project } from "../../types/entities";
import CreateProjectModal from "../../components/modals/CreateProjectModal";
import CreateTranslationModal from "../../components/modals/CreateTranslationModal";

interface DashboardProps {
  organizationId: number;
}

const Dashboard: FunctionalComponent<DashboardProps> = ({ organizationId }) => {
  const { token } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOrgSettingsOpen, setIsOrgSettingsOpen] = useState<boolean>(false);
  const [isProjectSettingsOpen, setIsProjectSettingsOpen] =
    useState<boolean>(false);

  const [selectedOrganization, setSelectedOrganization] =
    useState<ExtendedOrganization>();
  const { name, projects } = selectedOrganization ?? {};

  const {
    isCreateModalOpen: isCreateProjectOpen,
    isCreateLoading: isCreateProjectLoading,
    isDeleteLoading: isDeleteProjectLoading,
    selectedProjectId,
    setSelectedProjectId,
    onCreate: onCreateProject,
    onDelete: onDeleteProject,
    setCreateModalOpen: setCreateProjectOpen,
  } = useProject({
    organizationId,
    onCreateSuccess: (project: Project) => {
      setCreateProjectOpen(false);

      setIsLoading(true);

      getOrganization(token, {
        id: organizationId,
      })
        .then((organization) =>
          handleUpdateOrganization(organization, project.id)
        )
        .catch((error) =>
          console.error("Error while fetching organization:", error)
        )
        .finally(() => setIsLoading(false));
    },
    onDeleteSuccess: async (id: number) => {
      setIsProjectSettingsOpen(false);

      const organization = removeProjectFromOrganization(
        selectedOrganization,
        id
      );
      handleUpdateOrganization(organization);
    },
  });

  const {
    isCreateModalOpen: isCreateTranslationOpen,
    isCreateLoading: isCreateTranslationLoading,
    selectedTranslationId,
    setSelectedTranslationId,
    onCreate: onCreateTranslation,
    onDelete: onDeleteTranslation,
    setCreateModalOpen: setCreateTranslationOpen,
  } = useTranslation({
    projectId: selectedProjectId,
    onCreateSuccess: (translation) => {
      setCreateTranslationOpen(false);

      const organization = setTranslationToOrganizationProject(
        selectedOrganization,
        selectedProjectId,
        translation
      );
      handleUpdateOrganization(organization, selectedProjectId, translation.id);
    },
    onDeleteSuccess: (id: number) => {
      const organization = removeTranslationFromOrganizationProject(
        selectedOrganization,
        selectedProjectId,
        id
      );
      handleUpdateOrganization(organization, selectedProjectId);
    },
  });

  const handleUpdateOrganization = useCallback(
    (
      organization: ExtendedOrganization,
      projectId?: number,
      translationId?: number
    ) => {
      setSelectedOrganization(organization);

      if (projectId) {
        const project = getProjectFromOrganization(organization, projectId);
        if (project) {
          setSelectedProjectId(projectId);

          const translation = getTranslationFromOrganization(
            organization,
            projectId,
            translationId
          );
          if (translation) {
            setSelectedTranslationId(translationId);
          } else {
            setSelectedTranslationId(project.translations?.[0]?.id);
          }

          return;
        }
      }

      setSelectedProjectId(organization.projects?.[0]?.id);
      setSelectedTranslationId(
        organization.projects?.[0]?.translations?.[0]?.id
      );
    },
    [setSelectedProjectId, setSelectedTranslationId]
  );

  useEffect(() => {
    setIsLoading(true);

    getOrganization(token, {
      id: organizationId,
    })
      .then((organization) => handleUpdateOrganization(organization))
      .catch((error) =>
        console.error("Error while fetching organization:", error)
      )
      .finally(() => setIsLoading(false));

    return () => setSelectedOrganization(undefined);
  }, [handleUpdateOrganization, organizationId, token]);

  const handleProjectSelect = (event) => {
    setIsOrgSettingsOpen(false);

    const projectId = +event.target.value;
    setSelectedProjectId(projectId);

    const project = getProjectFromOrganization(selectedOrganization, projectId);
    setSelectedTranslationId(project?.translations?.[0]?.id);
  };

  const selectedProject = useMemo(
    () => getProjectFromOrganization(selectedOrganization, selectedProjectId),
    [selectedOrganization, selectedProjectId]
  );

  const selectedTranslation = useMemo(
    () =>
      getTranslationFromOrganization(
        selectedOrganization,
        selectedProjectId,
        selectedTranslationId
      ),
    [selectedOrganization, selectedProjectId, selectedTranslationId]
  );

  if (isLoading) {
    return (
      <main class="section is-medium">
        <progress class="progress is-small is-dark" max="100">
          50%
        </progress>
      </main>
    );
  }

  return (
    <main class="section">
      <div class="columns">
        <div class="column is-one-quarter is-desktop">
          <div class="columns is-justify-content-space-between is-vcentered is-mobile">
            <div class="column is-9 pr-0">
              <div class="is-text-overflow">
                <span class="title is-4 has-text-centered">{name}</span>
              </div>
            </div>
            {selectedOrganization && (
              <div class="column is-narrow">
                <button
                  class={`button is-small${
                    isOrgSettingsOpen ? " is-active" : ""
                  }`}
                  onClick={() => setIsOrgSettingsOpen(!isOrgSettingsOpen)}
                >
                  <span class="icon is-small">
                    <i class="bi bi-gear" />
                  </span>
                </button>
              </div>
            )}
          </div>
          {projects?.length ? (
            <div class="columns is-justify-content-space-between is-vcentered is-mobile">
              <div class="column is-9 pr-0">
                <div class="select">
                  <select onChange={handleProjectSelect}>
                    {projects?.map((project, i) => (
                      <option
                        key={`${project.id}_${i}`}
                        selected={project.id === selectedProjectId}
                        value={project.id}
                      >
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div class="column is-narrow">
                <button
                  class={`button is-small${
                    isProjectSettingsOpen ? " is-active" : ""
                  }`}
                  onClick={() =>
                    setIsProjectSettingsOpen(!isProjectSettingsOpen)
                  }
                >
                  <span class="icon is-small">
                    <i class="bi bi-gear" />
                  </span>
                </button>
              </div>
            </div>
          ) : undefined}
          <button
            class="button is-fullwidth"
            onClick={() => setCreateProjectOpen(true)}
          >
            CREATE PROJECT
          </button>
          {selectedProject && (
            <>
              {selectedProject.translations?.map(({ language, id }, i) => (
                <div
                  key={`${id}_${i}`}
                  class="is-flex is-flex-direction-column my-2"
                >
                  <a onClick={() => setSelectedTranslationId(id)}>{language}</a>
                </div>
              ))}
              <div class="is-flex is-flex-direction-column my-2">
                <a onClick={() => setCreateTranslationOpen(true)}>
                  <strong>New Translation</strong>
                </a>
              </div>
            </>
          )}
        </div>
        <div class="column">
          {isOrgSettingsOpen && (
            <OrganizationSettings
              organizationId={organizationId}
              onClose={() => setIsOrgSettingsOpen(false)}
            />
          )}
          {!isOrgSettingsOpen && isProjectSettingsOpen && (
            <ProjectSettings
              projectId={selectedProjectId}
              isDeleteLoading={isDeleteProjectLoading}
              onDelete={(projectId) => onDeleteProject(projectId)}
              onClose={() => setIsProjectSettingsOpen(false)}
            />
          )}
          {!isOrgSettingsOpen &&
            !isProjectSettingsOpen &&
            (selectedProject ? (
              selectedTranslation ? (
                <MainContentBlock
                  currentTranslation={selectedTranslation}
                  onDeleteTranslation={() =>
                    onDeleteTranslation(selectedTranslationId)
                  }
                />
              ) : (
                <div class="has-text-centered">
                  <span class="title is-5 m-0">
                    CREATE YOUR TRANSLATION FIRST
                  </span>
                </div>
              )
            ) : (
              <div class="has-text-centered">
                <span class="title is-5 m-0">CREATE YOUR PROJECT FIRST</span>
              </div>
            ))}
        </div>
      </div>

      {isCreateProjectOpen && (
        <CreateProjectModal
          open={isCreateProjectOpen}
          isLoading={isCreateProjectLoading}
          onSubmit={onCreateProject}
          onClose={() => setCreateProjectOpen(false)}
        />
      )}

      {isCreateTranslationOpen && (
        <CreateTranslationModal
          open={isCreateTranslationOpen}
          isLoading={isCreateTranslationLoading}
          onSubmit={onCreateTranslation}
          onClose={() => setCreateTranslationOpen(false)}
        />
      )}
    </main>
  );
};

export default Dashboard;
