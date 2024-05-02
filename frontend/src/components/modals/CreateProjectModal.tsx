import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";

import { CreateProjectPayload } from "../../types/requests";

interface CreateProjectModalProps {
  open: boolean;
  isLoading?: boolean;
  onSubmit: (values: CreateProjectPayload) => void;
  onClose: () => void;
}

const CreateProjectModal: FunctionalComponent<CreateProjectModalProps> = ({
  open,
  isLoading,
  onSubmit,
  onClose,
}) => {
  const [formData, setFormData] = useState<CreateProjectPayload>({
    name: "",
    description: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <div class={`modal${open ? " is-active" : ""}`}>
      <div class="modal-background" onClick={onClose} />
      <div class="modal-content box">
        <h1 class="title has-text-centered">Create new project</h1>
        <form onSubmit={handleFormSubmit}>
          <div class="field">
            <label htmlFor="name" class="label">
              Name
            </label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="NICE Project"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div class="field">
            <label htmlFor="name" class="label">
              Description
            </label>
            <div class="control">
              <textarea
                id="description"
                name="description"
                class="textarea"
                placeholder="Provide a short description of the project..."
                value={formData.description}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div class="buttons">
            <button type="submit" class="button is-primary">
              Create
            </button>
            <button type="button" class="button is-light" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;
