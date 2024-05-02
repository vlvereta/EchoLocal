import { h, FunctionalComponent, Fragment } from "preact";
import { useCallback, useEffect, useMemo, useState } from "preact/hooks";

import {
  ExtendedOrganization,
  ExtendedProject,
  Project,
} from "../../types/entities";
import ProjectSettings from "./ProjectSettings";
import MainContentBlock from "./MainContentBlock";
import { useProject } from "../../hooks/useProject";
import { useAuth } from "../../components/AuthContext";
import { getOrganization } from "../../api/organizations";
import OrganizationSettings from "./OrganizationSettings";
import { useTranslation } from "../../hooks/useTranslation";
import {
  getProjectFromOrganization,
  getTranslationFromOrganization,
  removeProjectFromOrganization,
  removeTranslationFromOrganizationProject,
  setTranslationToOrganizationProject,
} from "../../utils";
import CreateProjectModal from "../../components/modals/CreateProjectModal";
import CreateTranslationModal from "../../components/modals/CreateTranslationModal";

interface DashboardProps {
  organizationId: number;
}

const Dashboard: FunctionalComponent<DashboardProps> = ({ organizationId }) => {
  const { token } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOrgSettingsOpen, setIsOrgSettingsOpen] = useState<boolean>(false);

  const [selectedOrganization, setSelectedOrganization] =
    useState<ExtendedOrganization>();
  const { name, projects } = selectedOrganization ?? {};

  const [isProjectSettingsOpen, setIsProjectSettingsOpen] =
    useState<boolean>(false);

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
    onCreateSuccess: async (project: Project) => {
      setCreateProjectOpen(false);
      await fetchOrganization();
      setSelectedProjectId(project.id);
    },
    onDeleteSuccess: async (id: number) => {
      setIsProjectSettingsOpen(false);

      const organization = removeProjectFromOrganization(
        selectedOrganization,
        id
      );
      setSelectedOrganization(organization);
      setSelectedProjectId(organization.projects?.[0]?.id);
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
      setSelectedOrganization(organization);
      setSelectedTranslationId(translation.id);
    },
    onDeleteSuccess: (id: number) => {
      const organization = removeTranslationFromOrganizationProject(
        selectedOrganization,
        selectedProjectId,
        id
      );
      setSelectedOrganization(organization);
      setSelectedTranslationId(
        organization.projects?.[selectedProjectId]?.translations?.[0]?.id
      );
    },
  });

  const fetchOrganization = useCallback(async () => {
    setIsLoading(true);

    try {
      const organization = await getOrganization(token, {
        id: organizationId,
      });
      setSelectedOrganization(organization);
      setSelectedProjectId(organization.projects?.[0]?.id);
    } catch (error) {
      console.error("Error while fetching organization:", error);
    }

    setIsLoading(false);
  }, [token, organizationId, setSelectedProjectId]);

  useEffect(() => {
    fetchOrganization();
    return () => setSelectedOrganization(undefined);
  }, [fetchOrganization]);

  const handleProjectSelect = (event) => {
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
          {isProjectSettingsOpen && (
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
