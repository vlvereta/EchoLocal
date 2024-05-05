import { useState } from "preact/hooks";

// import { useAuth } from "../components/AuthContext";
import { TranslationKey, TranslationKeyData } from "../types/entities";

interface UseTranslationKeyCreate {
  isCreateLoading: boolean;
  onCreate: (payload: TranslationKeyData) => void;
}

export const useTranslationKey = ({
  // translationId,
  onCreateSuccess,
}: {
  translationId: number;
  onCreateSuccess?: (key: TranslationKey) => void;
}): UseTranslationKeyCreate => {
  // const { token } = useAuth();

  const [isCreateTranslationKeyOpen, setCreateTranslationKeyOpen] =
    useState<boolean>(false);

  const handleCreate = (data: TranslationKeyData) => {
    setCreateTranslationKeyOpen(true);

    try {
      console.log(data);
      onCreateSuccess({} as TranslationKey);
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
