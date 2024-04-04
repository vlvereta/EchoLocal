import { useCallback, useEffect, useState } from "preact/hooks";
import { h, FunctionalComponent } from "preact";

import { useAuth } from "../../components/AuthContext";
import { getOrganization } from "../../api/organizations";
import { ExtendedOrganization } from "../../types/entities";
import OrganizationSettings from "./OrganizationSettings";

interface DashboardProps {
  organizationId: string;
}

const Dashboard: FunctionalComponent<DashboardProps> = ({ organizationId }) => {
  const { token } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOrgSettingsOpen, setIsOrgSettingsOpen] = useState<boolean>(false);

  const [organization, setOrganization] = useState<ExtendedOrganization>(null);
  const { name } = organization ?? {};

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

  useEffect(() => {
    fetchOrganization();
    return () => setOrganization(null);
  }, [fetchOrganization]);

  if (isLoading) {
    return (
      <div class="spinner-border text-secondary" role="status">
        <span class="sr-only" />
      </div>
    );
  }

  return (
    <main class="section">
      <div class="columns">
        <div class="column is-one-quarter">
          <div class="block level">
            <div class="level-left">
              <div class="level-item">
                <h2 class="has-text-weight-bold">{name}</h2>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item">
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
            </div>
          </div>
        </div>
        <div class="column">
          {isOrgSettingsOpen && (
            <OrganizationSettings
              organizationId={organizationId}
              onClose={() => setIsOrgSettingsOpen(false)}
            />
          )}
          {!isOrgSettingsOpen && (
            <h2>Main Content!</h2>
          )}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
