import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";

import { TranslationKeyData } from "../types/entities";
import { useTranslationKey } from "../hooks/useTranslationKey";

interface NewTranslationKeyRowProps {
  translationId: number;
}

const NewTranslationKeyRow: FunctionalComponent<NewTranslationKeyRowProps> = ({
  translationId,
}) => {
  const initialState = {
    key: "",
    value: "",
  };

  const [formData, setFormData] = useState<TranslationKeyData>(initialState);

  const { isCreateLoading: isLoading, onCreate } = useTranslationKey({
    translationId,
    onCreateSuccess: () => setFormData(initialState),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <tr>
      <td>
        <input
          type="text"
          class="input"
          placeholder="New key"
          name="key"
          value={formData.key}
          onChange={handleChange}
          required
        />
      </td>
      <td colSpan={2}>
        <input
          type="text"
          class="input"
          placeholder="Value"
          name="value"
          value={formData.value}
          onChange={handleChange}
          required
        />
      </td>
      <td>
        <button
          class={`button is-primary is-fullwidth${
            isLoading ? " is-loading" : ""
          }`}
          onClick={() => onCreate(formData)}
          disabled={!formData.key || !formData.value}
        >
          Add
        </button>
      </td>
    </tr>
  );
};

export default NewTranslationKeyRow;
