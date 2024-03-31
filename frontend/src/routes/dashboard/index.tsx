import { route } from "preact-router";
import { h, FunctionalComponent } from "preact";
import { useEffect, useState } from "preact/hooks";

import { sleep } from "../../utils";
import ProjectSettings from "./ProjectSettings";
import { useAuth } from "../../components/AuthContext";
import OrganizationSettings from "./OrganizationSettings";
import { ExtendedOrganization, Project } from "../../types/entities";

import { mockedExtendedOrganization } from "../../mocks";

interface DashboardProps {
  organizationId: string;
  projectId: string;
}

const Dashboard: FunctionalComponent<DashboardProps> = ({
  organizationId,
  projectId,
}) => {
  const { token } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOrgSettingsOpen, setIsOrgSettingsOpen] = useState<boolean>(false);
  const [isProjectSettingsOpen, setIsProjectSettingsOpen] =
    useState<boolean>(false);

  const [organization, setOrganization] = useState<ExtendedOrganization>();
  const { name, projects = [] } = organization ?? {};

  const [project, setProject] = useState<Project>();

  useEffect(() => {
    setIsLoading(true);

    sleep(1000)
      .then(() => setOrganization(mockedExtendedOrganization))
      .finally(() => setIsLoading(false));

    // getOrganization(token, { id: organizationId })
    //   .then((data) => setOrganization(data))
    //   .catch((error) => console.error(error))
    //   .finally(() => setIsLoading(false));
  }, [token, organizationId]);

  useEffect(() => {
    if (projects.length) {
      if (projectId) {
        const selectedProject = projects.find(({ id }) => projectId === id);

        if (selectedProject) {
          setProject(selectedProject);
        } else {
          route(`/dashboard/${organizationId}`);
        }
      } else {
        route(`/dashboard/${organizationId}/${projects[0].id}`);
      }
    }
  }, [projects, projectId, organizationId]);

  const handleProjectSelect = (e) => {
    if (!e.target.value) {
      console.log("Create new project!");
    }

    const selectedProject = projects.find(({ id }) => e.target.value === id);
    selectedProject &&
      route(`/dashboard/${organizationId}/${selectedProject.id}`);
  };

  if (isLoading) {
    return (
      <div class="spinner-border text-secondary" role="status">
        <span class="sr-only" />
      </div>
    );
  }

  return (
    <div className="container-fluid p-0 full-height">
      <div className="row no-gutters full-height">
        <div className="col-3 sidebar">
          <div class="d-flex align-items-center gap-2 justify-content-between flex-wrap">
            <span>
              <strong>{name}</strong>
            </span>
            <div class="d-flex align-items-center gap-2">
              <button
                type="button"
                class="btn btn-light btn-sm"
                onClick={() => route("/organizations")}
              >
                <i class="bi bi-arrow-repeat" />
              </button>
              <button
                type="button"
                class={`btn btn-light btn-sm ${
                  isOrgSettingsOpen ? "active" : ""
                }`}
                onClick={() => setIsOrgSettingsOpen(!isOrgSettingsOpen)}
              >
                <i class="bi bi-gear" />
              </button>
            </div>
          </div>
          <div class="mt-3 d-flex align-items-center gap-2 justify-content-between">
            <select
              class="form-select"
              value={project?.id}
              onChange={handleProjectSelect}
              aria-label="Default select example"
            >
              <option value="">New project</option>
              {projects.map(({ id, name }, i) => (
                <option key={`${id}_${i}`} value={id}>
                  {name}
                </option>
              ))}
            </select>
            <button
              type="button"
              class={`btn btn-light btn-sm ${
                isProjectSettingsOpen ? "active" : ""
              }`}
              onClick={() => setIsProjectSettingsOpen(!isProjectSettingsOpen)}
            >
              <i class="bi bi-gear" />
            </button>
          </div>
        </div>

        <div className="col-9 content-area">
          {isOrgSettingsOpen && (
            <OrganizationSettings
              organizationId={organizationId}
              onClose={() => setIsOrgSettingsOpen(false)}
            />
          )}
          {!isOrgSettingsOpen && isProjectSettingsOpen && (
            <ProjectSettings onClose={() => setIsProjectSettingsOpen(false)} />
          )}
          {!isOrgSettingsOpen && !isProjectSettingsOpen && (
            <h2>Main Content</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
