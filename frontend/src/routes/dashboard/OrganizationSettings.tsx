import { FunctionalComponent, h, Fragment } from "preact";
import { route } from "preact-router";

import { useAuth } from "../../components/AuthContext";
import { deleteOrganization } from "../../api/organizations";

interface OrganizationSettingsProps {
  organizationId: string;
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
    <>
      <h2>Organization Settings</h2>
      <button type="button" class="btn btn-danger" onClick={handleOrgDelete}>
        DELETE
      </button>
      <button onClick={onClose}>CLOSE</button>
    </>
  );
};

export default OrganizationSettings;
