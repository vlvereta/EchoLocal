import { FunctionalComponent, h } from "preact";

import { TranslationSheet } from "../../types/entities";
import TranslationsTable from "../../components/TranslationsTable";

interface MainContentBlockProps {
  currentTranslation: TranslationSheet;
  onDeleteTranslation: () => void;
}

const MainContentBlock: FunctionalComponent<MainContentBlockProps> = ({
  currentTranslation,
  onDeleteTranslation,
}) => {
  return (
    <div class="box">
      <div class="block level">
        <div class="level-left">
          <span class="title is-4 m-0 level-item">
            {currentTranslation.language}
          </span>
          <span class="is-3 ml-3 is-italic level-item">{`(last updated: ${new Date(
            currentTranslation.updated_at
          ).toLocaleDateString("UA")})`}</span>
        </div>
        <div class="level-right">
          <button
            type="button"
            class="button is-danger is-light level-item"
            onClick={onDeleteTranslation}
          >
            DELETE
          </button>
        </div>
      </div>
      <TranslationsTable keys={[]} />
    </div>
  );
};

export default MainContentBlock;
