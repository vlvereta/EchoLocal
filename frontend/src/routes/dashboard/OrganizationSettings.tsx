import { FunctionalComponent, h } from "preact";
import { route } from "preact-router";

import { useAuth } from "../../components/AuthContext";
import { deleteOrganization } from "../../api/organizations";

interface OrganizationSettingsProps {
  organizationId: number;
  onClose: () => void;
}

const OrganizationSettings: FunctionalComponent<OrganizationSettingsProps> = ({
  organizationId,
  onClose,
}) => {
  const { token } = useAuth();

  const handleOrgDelete = async () => {
    try {
      await deleteOrganization(token, { id: organizationId });
      route("/organizations");
    } catch (error) {
      console.error("Error while deleting organization:", error);
    }
  };

  return (
    <div>
      <h2 class="subtitle has-text-weight-bold">Organization Settings</h2>
      <div class="buttons">
        <button
          type="button"
          class="button is-danger"
          onClick={handleOrgDelete}
        >
          DELETE
        </button>
        <button type="button" class="button" onClick={onClose}>
          CLOSE
        </button>
      </div>
    </div>
  );
};

export default OrganizationSettings;
