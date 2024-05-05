import { FunctionalComponent, h } from "preact";

import { TranslationKey } from "../types/entities";
import TranslationKeyRow from "./TranslationKeyRow";
import NewTranslationKeyRow from "./NewTranslationKeyRow";

interface TranslationsTableProps {
  keys: TranslationKey[];
}

const TranslationsTable: FunctionalComponent<TranslationsTableProps> = ({
  keys,
}) => {
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
              translationId={1}
              translationKey={key}
            />
          ))}
        </tbody>
        <NewTranslationKeyRow translationId={1} />
      </table>
    </div>
  );
};

export default TranslationsTable;
