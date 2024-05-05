import { FunctionalComponent, h } from "preact";
import { useEffect, useState } from "preact/hooks";

import { useAuth } from "../../components/AuthContext";
import { getTranslationKeys } from "../../api/translations";
import TranslationsTable from "../../components/TranslationsTable";
import { TranslationKey, TranslationSheet } from "../../types/entities";

interface MainContentBlockProps {
  currentTranslation: TranslationSheet;
  onDeleteTranslation: () => void;
}

const MainContentBlock: FunctionalComponent<MainContentBlockProps> = ({
  currentTranslation,
  onDeleteTranslation,
}) => {
  const { token } = useAuth();

  const [keys, setKeys] = useState<TranslationKey[]>([]);

  useEffect(() => {
    const fetchTranslationKeys = async () => {
      const keys = await getTranslationKeys(token, currentTranslation.id);
      setKeys(keys);
    };
    fetchTranslationKeys();
  }, [currentTranslation.id, token]);

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
      <TranslationsTable
        translationId={currentTranslation.id}
        keys={keys}
        setKeys={(keys: TranslationKey[]) => setKeys(keys)}
      />
    </div>
  );
};

export default MainContentBlock;
