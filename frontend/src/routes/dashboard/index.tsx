import { useCallback, useEffect, useState } from "preact/hooks";
import { h, Fragment, FunctionalComponent } from "preact";

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
                <span class="has-text-weight-bold">{name + name + name}</span>
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
        </div>
        <div class="column">
          {isOrgSettingsOpen && (
            <OrganizationSettings
              organizationId={organizationId}
              onClose={() => setIsOrgSettingsOpen(false)}
            />
          )}
          {!isOrgSettingsOpen && (
            <>
              <h2 class="subtitle has-text-weight-bold">MAIN Content!</h2>
              <h2 class="subtitle has-text-weight-bold">MORE Content!</h2>
              <h2 class="subtitle has-text-weight-bold">EVEN MORE Content!</h2>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
