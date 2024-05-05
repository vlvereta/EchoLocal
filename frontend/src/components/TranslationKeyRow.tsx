import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";

import { TranslationKey } from "../types/entities";
import { useTranslationKey } from "../hooks/useTranslationKey";

interface TranslationKeyRowProps {
  translationId: number;
  translationKey: TranslationKey;
  handleUpdate: (key: TranslationKey) => void;
  handleDelete: (id: number) => void;
}

const TranslationKeyRow: FunctionalComponent<TranslationKeyRowProps> = ({
  translationId,
  translationKey: { id, key, value },
  handleUpdate,
  handleDelete,
}) => {
  const [newValue, setNewValue] = useState<string>("");

  const { isUpdateLoading, isDeleteLoading, onUpdate, onDelete } =
    useTranslationKey({
      translationId,
      onUpdateSuccess: (key: TranslationKey) => {
        handleUpdate(key);
        setNewValue("");
      },
      onDeleteSuccess: () => handleDelete(id),
    });

  return (
    <tr key={key}>
      <td class="is-vcentered">
        <strong>{key}</strong>
      </td>
      <td class="is-vcentered">{value}</td>
      <td>
        <input
          type="text"
          class="input"
          placeholder="New value"
          value={newValue}
          onInput={(event) =>
            setNewValue((event.target as HTMLInputElement).value)
          }
          disabled={isUpdateLoading || isDeleteLoading}
        />
      </td>
      <td>
        <div class="buttons">
          <button
            class={`button${isUpdateLoading ? " is-loading" : ""}`}
            onClick={() => onUpdate(id, { key, value: newValue })}
            disabled={!newValue || isDeleteLoading}
          >
            <span class="icon is-small">
              <i class="bi bi-floppy" />
            </span>
          </button>
          <button
            class={`button is-outlined is-danger${
              isDeleteLoading ? " is-loading" : ""
            }`}
            onClick={() => onDelete(id)}
            disabled={isUpdateLoading}
          >
            <span class="icon is-small">
              <i class="bi bi-x-circle" />
            </span>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TranslationKeyRow;
