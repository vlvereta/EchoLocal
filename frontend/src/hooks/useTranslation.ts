import { useState } from "preact/hooks";

import { useAuth } from "../components/AuthContext";
import { TranslationSheet } from "../types/entities";
import { deleteTranslation } from "../api/translations";
import { createProjectTranslation } from "../api/projects";
import { CreateTranslationPayload } from "../types/requests";

interface UseTranslation {
  isCreateModalOpen: boolean;
  isCreateLoading: boolean;
  setCreateModalOpen: (open: boolean) => void;
  onCreate: (payload: CreateTranslationPayload) => void;
  onDelete: (id: number) => void;
}

export const useTranslation = ({
  projectId,
  onCreateSuccess,
  onDeleteSuccess,
}: {
  projectId: number;
  onCreateSuccess: (translation: TranslationSheet) => void;
  onDeleteSuccess: () => void;
}): UseTranslation => {
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

  const handleDelete = async (id: number) => {
    try {
      await deleteTranslation(token, id);

      onDeleteSuccess();
    } catch (error) {
      console.error("Error while deleting project:", error);
    }
  };

  return {
    isCreateModalOpen: isCreateTranslationOpen,
    isCreateLoading: isCreateTranslationLoading,
    onCreate: handleSubmit,
    onDelete: handleDelete,
    setCreateModalOpen: (open: boolean) => setIsCreateTranslationOpen(open),
  };
};
