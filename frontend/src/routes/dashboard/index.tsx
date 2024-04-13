import { useCallback, useEffect, useState } from "preact/hooks";
import { h, FunctionalComponent } from "preact";

import {
  createOrganizationProject,
  getOrganization,
} from "../../api/organizations";
import ProjectSettings from "./ProjectSettings";
import MainContentBlock from "./MainContentBlock";
import { deleteProject } from "../../api/projects";
import { useAuth } from "../../components/AuthContext";
import OrganizationSettings from "./OrganizationSettings";
import { CreateProjectPayload } from "../../types/requests";
import { getExtendedProjectFromOrganization } from "../../utils";
import CreateProjectModal from "../../components/CreateProjectModal";
import { ExtendedOrganization, ExtendedProject } from "../../types/entities";

import { mockedExtendedOrganization } from "../../mocks";

interface DashboardProps {
  organizationId: string;
}

const Dashboard: FunctionalComponent<DashboardProps> = ({ organizationId }) => {
  const { token } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOrgSettingsOpen, setIsOrgSettingsOpen] = useState<boolean>(false);

  const [extendedOrganization, setExtendedOrganization] =
    useState<ExtendedOrganization>(null);
  const { name, projects } = extendedOrganization ?? {};

  const [isCreateProjectOpen, setIsCreateProjectOpen] =
    useState<boolean>(false);
  const [isProjectSettingsOpen, setIsProjectSettingsOpen] =
    useState<boolean>(false);
  const [selectedExtendedProject, setSelectedExtendedProject] =
    useState<ExtendedProject>();

  const fetchOrganization = useCallback(async () => {
    setIsLoading(true);

    try {
      /* const organization =  */ await getOrganization(token, {
        id: organizationId,
      });
      // setOrganization(organization);

      setExtendedOrganization(mockedExtendedOrganization);

      // Extended organization keeps extended projects
      setSelectedExtendedProject(mockedExtendedOrganization?.projects?.[0]);
      // setSelectedExtendedProject(organization?.projects?.[0]);
    } catch (error) {
      console.error("Error while fetching organization:", error);
    }

    setIsLoading(false);
  }, [token, organizationId]);

  const handleCreateProject = async (payload: CreateProjectPayload) => {
    try {
      const project = await createOrganizationProject(
        token,
        organizationId,
        payload
      );

      if (project?.id) {
        setIsCreateProjectOpen(false);
        await fetchOrganization();

        const extendedProject = getExtendedProjectFromOrganization(
          extendedOrganization,
          project.id
        );
        setSelectedExtendedProject(extendedProject);
      }
    } catch (error) {
      console.error("Error while creating project:", error);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      await deleteProject(token, projectId);

      setIsProjectSettingsOpen(false);
      await fetchOrganization();
    } catch (error) {
      console.error("Error while deleting project:", error);
    }
  };

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
      event.target.value
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
            onClick={() => setIsCreateProjectOpen(true)}
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
            <a>
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
              onDelete={(projectId) => handleDeleteProject(projectId)}
              onClose={() => setIsProjectSettingsOpen(false)}
            />
          )}
          {!isOrgSettingsOpen && !isProjectSettingsOpen && <MainContentBlock />}
        </div>
      </div>

      <CreateProjectModal
        open={isCreateProjectOpen}
        isLoading={isLoading}
        onSubmit={handleCreateProject}
        onClose={() => setIsCreateProjectOpen(false)}
      />
    </main>
  );
};

export default Dashboard;
