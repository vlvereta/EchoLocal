import { FunctionalComponent, h } from "preact";

import { TranslationKey } from "../types/entities";

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
            <th>New value</th>
          </tr>
        </thead>
        <tbody>
          {keys.map(({ key, value }) => (
            <tr key={key}>
              <td>
                <strong>{key}</strong>
              </td>
              <td>{value}</td>
              <td>
                <input type="text" class="input" placeholder="" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TranslationsTable;
