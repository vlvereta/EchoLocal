import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";

import { TranslationKey } from "../types/entities";
import { useTranslationKey } from "../hooks/useTranslationKey";

interface TranslationKeyRowProps {
  translationId: number;
  translationKey: TranslationKey;
}

const TranslationKeyRow: FunctionalComponent<TranslationKeyRowProps> = ({
  translationId,
  translationKey: { key, value },
}) => {
  const [newValue, setNewValue] = useState<string>("");

  const {} = useTranslationKey({
    translationId,
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
        />
      </td>
      <td>
        <div class="buttons">
          <button class="button" disabled={!newValue}>
            <span class="icon is-small">
              <i class="bi bi-floppy" />
            </span>
          </button>
          <button class="button is-outlined is-danger">
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
