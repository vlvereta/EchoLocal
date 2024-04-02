import { h } from "preact";
import { route } from "preact-router";
import { useState } from "preact/hooks";

import { useAuth } from "../../components/AuthContext";
import { createOrganization } from "../../api/organizations";
import { CreateOrganizationPayload } from "../../types/requests";

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
      const organization = await createOrganization(token, formData);

      if (organization?.id) {
        route(`/dashboard/${organization.id}`);
      } else {
        route("/organizations");
      }
    } catch (error) {
      setIsError(true);
      console.error("Error while creating organization:", error);
    }

    setIsLoading(false);
  };

  return (
    <main class="section is-medium">
      <div class="columns is-centered">
        <form onSubmit={handleSubmit} class="box column is-half">
          <div class="field">
            <label htmlFor="name" class="label">
              Organization name
            </label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Awesome Organization"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {isError && (
            <div class="notification is-danger is-light" role="alert">
              There's an error while creating organization.
            </div>
          )}

          <button
            type="submit"
            class={`button is-primary${isLoading ? " is-loading" : ""}`}
          >
            Create
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreateOrganization;
