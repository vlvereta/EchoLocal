import { h, FunctionalComponent } from "preact";
import { route } from "preact-router";

import { useAuth } from "../../components/AuthContext";
import { deleteOrganization } from "../../api/organizations";

interface OrganizationProps {
  id: string;
}

const Organization: FunctionalComponent<OrganizationProps> = ({ id }) => {
  const { token } = useAuth();

  // TODO: fetch org. details, projects
  // Verify the user and authorization

  const handleOrgDelete = async () => {
    try {
      await deleteOrganization(token, { id });
      route("/onboarding");
    } catch (error) {
      console.error("Error while deleting organization:", error);
    }
  };

  return (
    <div class="d-flex flex-column align-items-center">
      <h2>Organization page</h2>
      <button type="button" class="btn btn-danger" onClick={handleOrgDelete}>
        DELETE
      </button>
    </div>
  );
};

export default Organization;
