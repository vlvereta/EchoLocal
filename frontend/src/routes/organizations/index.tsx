import { h } from "preact";
import { route } from "preact-router";
import { useCallback, useEffect, useState } from "preact/hooks";

import { Organization } from "../../types/entities";
import { useAuth } from "../../components/AuthContext";
import { getOrganizations } from "../../api/organizations";

const Organizations = () => {
  const { token } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  const fetchOrganizations = useCallback(async () => {
    setIsError(false);
    setIsLoading(true);

    try {
      const organizations = await getOrganizations(token);
      setOrganizations(organizations);
    } catch (error) {
      setIsError(true);
      console.error("Error while fetching organizations:", error);
    }

    setIsLoading(false);
  }, [token]);

  useEffect(() => {
    fetchOrganizations();
    return () => setOrganizations([]);
  }, [fetchOrganizations]);

  return (
    <main class="section is-medium">
      <div class="columns is-centered">
        <div class="column is-one-third box">
          <h2 class="block has-text-centered has-text-weight-bold is-size-3">
            Select organization
          </h2>
          <div class="buttons is-flex is-flex-direction-column">
            {isLoading && (
              <button type="button" class="button is-fullwidth is-loading">
                ORGANIZATION
              </button>
            )}

            {isError && (
              <div class="notification is-danger is-light mt-1" role="alert">
                There's an error while fetching organizations. Please,{" "}
                <a
                  as="button"
                  onClick={fetchOrganizations}
                  style={{ cursor: "pointer" }}
                >
                  retry
                </a>{" "}
                or try later.
              </div>
            )}

            {!isLoading &&
              !isError &&
              organizations.map((org, i) => (
                <button
                  type="button"
                  key={`${org.id}_${i}`}
                  class="button is-fullwidth"
                  onClick={() => route(`/organizations/${org.id}`)}
                >
                  {org.name}
                </button>
              ))}

            <button
              type="button"
              class="button is-fullwidth is-primary"
              onClick={() => route("/organizations/create")}
            >
              Create new
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Organizations;
