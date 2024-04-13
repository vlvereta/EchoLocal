import { useCallback, useEffect, useState } from "preact/hooks";
import { h, Fragment, FunctionalComponent } from "preact";

import { useAuth } from "../../components/AuthContext";
import {
  createOrganizationProject,
  getOrganization,
  getOrganizationProjects,
} from "../../api/organizations";
import OrganizationSettings from "./OrganizationSettings";
import { ExtendedOrganization, Project } from "../../types/entities";
import ProjectSettings from "./ProjectSettings";
import { CreateProjectPayload } from "../../types/requests";
import CreateProjectModal from "../../components/CreateProjectModal";

interface DashboardProps {
  organizationId: string;
}

const Dashboard: FunctionalComponent<DashboardProps> = ({ organizationId }) => {
  const { token } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOrgSettingsOpen, setIsOrgSettingsOpen] = useState<boolean>(false);
  const [isProjectSettingsOpen, setIsProjectSettingsOpen] =
    useState<boolean>(false);

  const [organization, setOrganization] = useState<ExtendedOrganization>(null);
  const { name } = organization ?? {};

  const [projects, setProjects] = useState<Project[]>([]);
  const [isCreateProjectOpen, setIsCreateProjectOpen] =
    useState<boolean>(false);

  const handleCreateProject = async (payload: CreateProjectPayload) => {
    try {
      const project = await createOrganizationProject(
        token,
        organizationId,
        payload
      );

      if (project?.id) {
        setIsCreateProjectOpen(false);
        fetchProjects();
      }
    } catch (error) {
      console.error("Error while creating project:", error);
    }
  };

  const fetchOrganization = useCallback(async () => {
    setIsLoading(true);

    try {
      const organization = await getOrganization(token, { id: organizationId });
      setOrganization(organization);
    } catch (error) {
      console.error("Error while fetching organization:", error);
    }

    setIsLoading(false);
  }, [token, organizationId]);

  const fetchProjects = useCallback(async () => {
    try {
      const projects = await getOrganizationProjects(token, organizationId);
      console.log("projects:", projects);
      setProjects(projects);
    } catch (error) {
      console.error("Error while fetching projects:", error);
    }
  }, [token, organizationId]);

  useEffect(() => {
    fetchOrganization();
    fetchProjects();

    return () => {
      setOrganization(null);
      setProjects([]);
    };
  }, [fetchOrganization, fetchProjects]);

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
                <span class="has-text-weight-bold">{name}</span>
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
          <div class="columns is-justify-content-space-between is-vcentered is-mobile">
            <div class="column is-9 pr-0">
              <div class="select">
                <select>
                  {projects.map((project, i) => (
                    <option key={`${project.id}_${i}`}>{project.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div class="column is-narrow">
              <button
                class={`button is-small${
                  isProjectSettingsOpen ? " is-active" : ""
                }`}
                onClick={() => setIsProjectSettingsOpen(!isProjectSettingsOpen)}
              >
                <span class="icon is-small">
                  <i class="bi bi-gear" />
                </span>
              </button>
            </div>
          </div>
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
            <ProjectSettings onClose={() => setIsProjectSettingsOpen(false)} />
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
