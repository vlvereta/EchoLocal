import { useState } from "preact/hooks";

import { useAuth } from "../components/AuthContext";
import { TranslationSheet } from "../types/entities";
import { createProjectTranslation } from "../api/projects";
import { CreateTranslationPayload } from "../types/requests";

interface UseTranslation {
  isCreateModalOpen: boolean;
  isCreateLoading: boolean;
  setCreateModalOpen: (open: boolean) => void;
  onCreate: (payload: CreateTranslationPayload) => void;
  onDelete: (id: number) => void;
}

export const useTranslation = (
  projectId: number,
  onCreateSuccess: (translation: TranslationSheet) => void
): UseTranslation => {
  const { token } = useAuth();

  const [isCreateTranslationOpen, setIsCreateTranslationOpen] =
    useState<boolean>(false);
  const [isCreateTranslationLoading, setIsCreateTranslationLoading] =
    useState<boolean>(false);

  const handleSubmit = async (payload: CreateTranslationPayload) => {
    setIsCreateTranslationLoading(true);

    try {
      const translation = await createProjectTranslation(
        token,
        projectId,
        payload
      );

      setIsCreateTranslationOpen(false);
      onCreateSuccess(translation);
    } catch (error) {
      console.error("Error while creating translation:", error);
    }

    setIsCreateTranslationLoading(false);
  };

  const handleDelete = (id: number) => {
    console.log("handleDelete:", id);
  };

  return {
    isCreateModalOpen: isCreateTranslationOpen,
    isCreateLoading: isCreateTranslationLoading,
    onCreate: handleSubmit,
    onDelete: handleDelete,
    setCreateModalOpen: (open: boolean) => setIsCreateTranslationOpen(open),
  };
};
