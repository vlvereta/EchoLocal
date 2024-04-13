import { FunctionalComponent, h } from "preact";

import { mockedTranslationKeys } from "../../mocks";
import TranslationsTable from "../../components/TranslationsTable";

const MainContentBlock: FunctionalComponent = () => {
  return <TranslationsTable keys={mockedTranslationKeys} />;
};

export default MainContentBlock;
