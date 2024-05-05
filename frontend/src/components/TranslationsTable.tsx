import { FunctionalComponent, h } from "preact";

import { TranslationKey } from "../types/entities";
import TranslationKeyRow from "./TranslationKeyRow";
import NewTranslationKeyRow from "./NewTranslationKeyRow";

interface TranslationsTableProps {
  translationId: number;
  keys: TranslationKey[];
  setKeys: (keys: TranslationKey[]) => void;
}

const TranslationsTable: FunctionalComponent<TranslationsTableProps> = ({
  translationId,
  keys,
  setKeys,
}) => {
  const handleCreate = (key: TranslationKey) => {
    setKeys([...keys, key]);
  };

  const handleUpdate = (key: TranslationKey) => {
    setKeys(keys.map((k) => (k.key === key.key ? key : k)));
  };

  const handleDelete = (id: number) => {
    setKeys(keys.filter((k) => k.id !== id));
  };

  return (
    <div class="table-container is-fullwidth">
      <table class="table is-fullwidth is-bordered is-striped">
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
            <th colSpan={2}>New value</th>
          </tr>
        </thead>
        <tbody>
          {keys.map((key) => (
            <TranslationKeyRow
              key={key}
              translationId={translationId}
              translationKey={key}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
            />
          ))}
        </tbody>
        <NewTranslationKeyRow translationId={translationId} handleCreate={handleCreate} />
      </table>
    </div>
  );
};

export default TranslationsTable;
