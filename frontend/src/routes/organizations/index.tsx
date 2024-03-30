import { h } from "preact";
import { route } from "preact-router";
import { useCallback, useEffect, useState } from "preact/hooks";

import { Organization } from "../../types";
import { useAuth } from "../../components/AuthContext";
import { getOrganizations } from "../../api/organizations";

const Organizations = () => {
  const { token } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  const fetchOrganizations = useCallback(() => {
    setIsError(false);
    setIsLoading(true);

    getOrganizations(token)
      .then((data) => {
        setOrganizations(data);
      })
      .catch((error) => {
        setIsError(true);
        console.error("Error while fetching organizations.", error);
      })
      .finally(() => setIsLoading(false));
  }, [token]);

  useEffect(() => {
    fetchOrganizations();
  }, [fetchOrganizations]);

  if (isLoading) {
    return (
      <div class="spinner-border text-secondary" role="status">
        <span class="sr-only" />
      </div>
    );
  }

  if (isError) {
    return (
      <div class="alert alert-danger" role="alert">
        There's an error while fetching organizations. Please,{" "}
        <a
          as="button"
          class="alert-link"
          onClick={fetchOrganizations}
          style={{ cursor: "pointer" }}
        >
          retry
        </a>{" "}
        or try later.
      </div>
    );
  }

  if (!organizations.length) {
    return (
      <div class="d-flex flex-column align-items-center gap-2">
        <h2 class="text-center">Welcome on board ;)</h2>
        <h3 class="text-center">
          To start with, create your first organization
        </h3>
        <button
          type="button"
          class="btn btn-outline-secondary"
          onClick={() => route("/create-organization")}
        >
          {"Create organization ->"}
        </button>
      </div>
    );
  }

  return (
    <div class="d-flex flex-column w-50 gap-2">
      <h2 class="text-center">Select organization</h2>
      {organizations.map((org, i) => (
        <button
          type="button"
          key={`${org.id}_${i}`}
          onClick={() => route(`/Organizations/${org.id}`)}
          class="btn btn-outline-secondary btn-block"
        >
          {org.name}
        </button>
      ))}
      <button
        type="button"
        class="btn btn-outline-secondary btn-block"
        onClick={() => route("/create-organization")}
      >
        Create new
      </button>
    </div>
  );
};

export default Organizations;
