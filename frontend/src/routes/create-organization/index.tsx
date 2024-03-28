import { h, Fragment } from "preact";
import { route } from "preact-router";
import { useState } from "preact/hooks";

import { useAuth } from "../../components/AuthContext";
import { CreateOrganizationPayload } from "../../types";
import { createOrganization } from "../../api/organizations";

const CreateOrganization = () => {
  const { token } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [formData, setFormData] = useState<CreateOrganizationPayload>({
    name: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsError(false);
    setIsLoading(true);

    try {
      const response = await createOrganization(token, formData);
      route(`/organizations/${response.id}`);
    } catch (error) {
      setIsError(true);
      console.error("Error while creating organization.", error);
    }

    setIsLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="container mt-5">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Organization name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>
        {isError && (
          <div class="alert alert-danger" role="alert">
            There's an error while creating organization.
          </div>
        )}
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? (
            <span
              role="status"
              aria-hidden="true"
              class="spinner-border spinner-border-sm"
            />
          ) : (
            <span>Create</span>
          )}
        </button>
      </form>
    </>
  );
};

export default CreateOrganization;
