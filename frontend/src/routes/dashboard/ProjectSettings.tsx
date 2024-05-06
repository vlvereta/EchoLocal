import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";

import { ExtendedProject } from "../../types/entities";
import { CreateProjectPayload } from "../../types/requests";

interface ProjectSettingsProps {
  project: ExtendedProject;
  isUpdateLoading?: boolean;
  isDeleteLoading?: boolean;
  onUpdate: (projectId: number, values: CreateProjectPayload) => void;
  onDelete: (projectId: number) => void;
  onClose: () => void;
}

const ProjectSettings: FunctionalComponent<ProjectSettingsProps> = ({
  project,
  isUpdateLoading,
  isDeleteLoading,
  onUpdate,
  onDelete,
  onClose,
}) => {
  const [formData, setFormData] = useState<CreateProjectPayload>({
    name: project.name,
    description: project.description,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    onUpdate(project.id, formData);
  };

  const isLoading = isUpdateLoading || isDeleteLoading;
  const isUpdateDisabled =
    isLoading ||
    !formData.name ||
    !formData.description ||
    (formData.name === project.name &&
      formData.description === project.description);

  return (
    <div>
      <h2 class="subtitle has-text-weight-bold">Project Settings</h2>
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
              onInput={handleChange}
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
              onInput={handleChange}
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <div class="buttons">
          <button
            type="button"
            class="button"
            onClick={onClose}
            disabled={isLoading}
          >
            CLOSE
          </button>
          <button
            type="submit"
            class={`button is-primary${isUpdateLoading ? " is-loading" : ""}`}
            disabled={isUpdateDisabled}
          >
            UPDATE
          </button>
          <button
            type="button"
            class={`button is-danger${isDeleteLoading ? " is-loading" : ""}`}
            onClick={() => onDelete(project.id)}
            disabled={isLoading}
          >
            DELETE
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectSettings;
