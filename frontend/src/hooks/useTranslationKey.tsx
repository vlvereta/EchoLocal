import { useState } from "preact/hooks";

import { useAuth } from "../components/AuthContext";
import { createTranslationKey } from "../api/translations";
import { TranslationKey, TranslationKeyData } from "../types/entities";

interface UseTranslationKeyCreate {
  isCreateLoading: boolean;
  onCreate: (payload: TranslationKeyData) => void;
}

export const useTranslationKey = ({
  translationId,
  onCreateSuccess,
}: {
  translationId: number;
  onCreateSuccess?: (key: TranslationKey) => void;
}): UseTranslationKeyCreate => {
  const { token } = useAuth();

  const [isCreateTranslationKeyOpen, setCreateTranslationKeyOpen] =
    useState<boolean>(false);

  const handleCreate = async (data: TranslationKeyData) => {
    setCreateTranslationKeyOpen(true);

    try {
      const translationKey = await createTranslationKey(
        token,
        translationId,
        data
      );
      onCreateSuccess(translationKey);
    } catch (error) {
      console.error("Error while creating translation key:", error);
    }

    setCreateTranslationKeyOpen(false);
  };

  return {
    isCreateLoading: isCreateTranslationKeyOpen,
    onCreate: onCreateSuccess ? handleCreate : undefined,
  };
};
