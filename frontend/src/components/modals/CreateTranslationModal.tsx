import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";

import { CreateTranslationPayload } from "../../types/requests";

interface CreateTranslationModalProps {
  open: boolean;
  isLoading?: boolean;
  onSubmit: (values: CreateTranslationPayload) => void;
  onClose: () => void;
}

const CreateTranslationModal: FunctionalComponent<
  CreateTranslationModalProps
> = ({ open, isLoading, onSubmit, onClose }) => {
  const [formData, setFormData] = useState<CreateTranslationPayload>({
    language: "",
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
        <h1 class="title has-text-centered">Create new translation</h1>
        <form onSubmit={handleFormSubmit}>
          <div class="field">
            <label htmlFor="name" class="label">
              Language
            </label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="English"
                id="language"
                name="language"
                value={formData.language}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div class="buttons">
            <button type="submit" class={`button is-primary${isLoading ? " is-loading" : ""}`}>
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

export default CreateTranslationModal;
