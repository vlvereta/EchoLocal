import { useCallback, useEffect, useState } from "preact/hooks";
import { h, FunctionalComponent } from "preact";

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
import { getExtendedProjectFromOrganization } from "../../utils";
import CreateProjectModal from "../../components/modals/CreateProjectModal";
import CreateTranslationModal from "../../components/modals/CreateTranslationModal";

interface DashboardProps {
  organizationId: number;
}

const Dashboard: FunctionalComponent<DashboardProps> = ({ organizationId }) => {
  const { token } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOrgSettingsOpen, setIsOrgSettingsOpen] = useState<boolean>(false);

  const [extendedOrganization, setExtendedOrganization] =
    useState<ExtendedOrganization>(null);
  const { name, projects } = extendedOrganization ?? {};

  const [isProjectSettingsOpen, setIsProjectSettingsOpen] =
    useState<boolean>(false);
  const [selectedExtendedProject, setSelectedExtendedProject] =
    useState<ExtendedProject>();

  const {
    isCreateModalOpen: isCreateProjectOpen,
    isCreateLoading: isCreateProjectLoading,
    isDeleteLoading: isDeleteProjectLoading,
    onCreate: onCreateProject,
    onDelete: onDeleteProject,
    setCreateModalOpen: setCreateProjectOpen,
  } = useProject({
    organizationId,
    onCreateSuccess: async (project: Project) => {
      await fetchOrganization();

      const extendedProject = getExtendedProjectFromOrganization(
        extendedOrganization,
        project.id
      );
      setSelectedExtendedProject(extendedProject);
    },
    onDeleteSuccess: async () => {
      setIsProjectSettingsOpen(false);
      await fetchOrganization();
    },
  });

  const {
    isCreateModalOpen: isCreateTranslationOpen,
    isCreateLoading: isCreateTranslationLoading,
    onCreate: onCreateTranslation,
    onDelete: onDeleteTranslation,
    setCreateModalOpen: setCreateTranslationOpen,
  } = useTranslation({
    projectId: selectedExtendedProject?.id,
    onCreateSuccess: (translation) =>
      setSelectedExtendedProject({
        ...selectedExtendedProject,
        translations: selectedExtendedProject.translations.concat([
          translation,
        ]),
      }),
    onDeleteSuccess: () => console.log("DELETED"),
  });

  const fetchOrganization = useCallback(async () => {
    setIsLoading(true);

    try {
      const organization = await getOrganization(token, {
        id: organizationId,
      });
      setExtendedOrganization(organization);

      // Extended organization keeps extended projects
      setSelectedExtendedProject(organization?.projects?.[0]);
    } catch (error) {
      console.error("Error while fetching organization:", error);
    }

    setIsLoading(false);
  }, [token, organizationId]);

  useEffect(() => {
    fetchOrganization();
    return () => setExtendedOrganization(null);
  }, [fetchOrganization]);

  if (isLoading) {
    return (
      <main class="section is-medium">
        <progress class="progress is-small is-dark" max="100">
          50%
        </progress>
      </main>
    );
  }

  const handleProjectSelect = (event) => {
    const extendedProject = getExtendedProjectFromOrganization(
      extendedOrganization,
      +event.target.value
    );
    setSelectedExtendedProject(extendedProject);
  };

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
            {extendedOrganization && (
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
                        selected={project.id === selectedExtendedProject?.id}
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
          {selectedExtendedProject?.translations?.map(({ language, id }, i) => (
            <div
              key={`${id}_${i}`}
              class="is-flex is-flex-direction-column my-2"
            >
              <a>{language}</a>
            </div>
          ))}
          <div class="is-flex is-flex-direction-column my-2">
            <a onClick={() => setCreateTranslationOpen(true)}>
              <strong>New</strong>
            </a>
          </div>
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
              projectId={selectedExtendedProject?.id}
              isDeleteLoading={isDeleteProjectLoading}
              onDelete={(projectId) => onDeleteProject(projectId)}
              onClose={() => setIsProjectSettingsOpen(false)}
            />
          )}
          {!isOrgSettingsOpen &&
            !isProjectSettingsOpen &&
            selectedExtendedProject?.translations?.[0] && (
              <MainContentBlock
                currentTranslation={selectedExtendedProject?.translations?.[0]}
                onDeleteTranslation={() =>
                  onDeleteTranslation(
                    selectedExtendedProject?.translations?.[0]?.id
                  )
                }
              />
            )}
          {/* TODO: add an empty screen when no translation selected */}
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
