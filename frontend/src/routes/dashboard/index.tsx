import { useCallback, useEffect, useState } from "preact/hooks";
import { h, Fragment, FunctionalComponent } from "preact";

import {
  createOrganizationProject,
  getOrganization,
} from "../../api/organizations";
import ProjectSettings from "./ProjectSettings";
import { deleteProject } from "../../api/projects";
import { useAuth } from "../../components/AuthContext";
import OrganizationSettings from "./OrganizationSettings";
import { ExtendedOrganization } from "../../types/entities";
import { CreateProjectPayload } from "../../types/requests";
import CreateProjectModal from "../../components/CreateProjectModal";

interface DashboardProps {
  organizationId: string;
}

const Dashboard: FunctionalComponent<DashboardProps> = ({ organizationId }) => {
  const { token } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOrgSettingsOpen, setIsOrgSettingsOpen] = useState<boolean>(false);

  const [organization, setOrganization] = useState<ExtendedOrganization>(null);
  const { name, projects } = organization ?? {};

  const [isCreateProjectOpen, setIsCreateProjectOpen] =
    useState<boolean>(false);
  const [isProjectSettingsOpen, setIsProjectSettingsOpen] =
    useState<boolean>(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string>();

  const fetchOrganization = useCallback(async () => {
    setIsLoading(true);

    try {
      const organization = await getOrganization(token, { id: organizationId });
      setOrganization(organization);
      setSelectedProjectId(organization?.projects?.[0]?.id);
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
        setSelectedProjectId(project.id);
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
    return () => setOrganization(null);
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

  return (
    <main class="section">
      <div class="columns">
        <div class="column is-one-quarter is-desktop">
          <div class="columns is-justify-content-space-between is-vcentered is-mobile">
            <div class="column is-9 pr-0">
              <div class="is-text-overflow">
                <h4 class="title is-4 has-text-centered">{name}</h4>
              </div>
            </div>
            {organization && (
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
                  <select
                    onChange={(event) =>
                      setSelectedProjectId(
                        (event.target as HTMLSelectElement).value
                      )
                    }
                  >
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
            onClick={() => setIsCreateProjectOpen(true)}
          >
            CREATE PROJECT
          </button>
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
              onDelete={(projectId) => handleDeleteProject(projectId)}
              onClose={() => setIsProjectSettingsOpen(false)}
            />
          )}
          {!isOrgSettingsOpen && !isProjectSettingsOpen && (
            <>
              <h2 class="subtitle has-text-weight-bold">MAIN Content!</h2>
              <h2 class="subtitle has-text-weight-bold">MORE Content!</h2>
              <h2 class="subtitle has-text-weight-bold">EVEN MORE Content!</h2>
            </>
          )}
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
