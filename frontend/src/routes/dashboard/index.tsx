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
import { CreateProjectPayload } from "src/types/requests";

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
  const [formData, setFormData] = useState<CreateProjectPayload>({
    name: "",
    description: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const project = await createOrganizationProject(
        token,
        organizationId,
        formData
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
          <button
            class="button is-primary"
            onClick={() => setIsCreateProjectOpen(true)}
          >
            CREATE PROJECT
          </button>
          {projects.map((project, i) => (
            <div
              key={`${project.id}_${i}`}
              class="columns is-justify-content-space-between is-vcentered is-mobile"
            >
              <div class="column is-9 pr-0">
                <div class="is-text-overflow">
                  <span class="has-text-weight-bold">{project.name}</span>
                </div>
              </div>
              {organization && (
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
              )}
            </div>
          ))}
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
      <div class={`modal${isCreateProjectOpen ? " is-active" : ""}`}>
        <div class="modal-background" />
        <div class="modal-content">
          <form onSubmit={handleSubmit} class="box">
            <div class="field">
              <label htmlFor="name" class="label">
                Create new project
              </label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Project 1"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div class="field">
              <label htmlFor="name" class="label">
                Description
              </label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Bla-bla-bla..."
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <button type="submit" class="button is-primary">
              Create
            </button>
          </form>
        </div>
        <button
          class="modal-close is-large"
          aria-label="close"
          onClick={() => setIsCreateProjectOpen(false)}
        />
      </div>
    </main>
  );
};

export default Dashboard;
