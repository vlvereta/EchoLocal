import { useState } from "preact/hooks";

import { useAuth } from "../components/AuthContext";
import { TranslationSheet } from "../types/entities";
import { deleteTranslation } from "../api/translations";
import { createProjectTranslation } from "../api/projects";
import { CreateTranslationPayload } from "../types/requests";

interface UseTranslation {
  isCreateModalOpen: boolean;
  isCreateLoading: boolean;
  isDeleteLoading: boolean;
  selectedTranslationId?: number;
  setSelectedTranslationId: (id?: number) => void;
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
  onDeleteSuccess: (id: number) => void;
}): UseTranslation => {
  const { token } = useAuth();

  const [isCreateTranslationOpen, setCreateTranslationOpen] =
    useState<boolean>(false);
  const [isCreateTranslationLoading, setCreateTranslationLoading] =
    useState<boolean>(false);
  const [isDeleteTranslationLoading, setDeleteTranslationLoading] =
    useState<boolean>(false);

  const [selectedTranslationId, setSelectedTranslationId] = useState<number>();

  const handleSubmit = async (payload: CreateTranslationPayload) => {
    setCreateTranslationLoading(true);

    try {
      const translation = await createProjectTranslation(
        token,
        projectId,
        payload
      );
      onCreateSuccess(translation);
    } catch (error) {
      console.error("Error while creating translation:", error);
    }

    setCreateTranslationLoading(false);
  };

  const handleDelete = async (id: number) => {
    setDeleteTranslationLoading(true);

    try {
      await deleteTranslation(token, id);
      onDeleteSuccess(id);
    } catch (error) {
      console.error("Error while deleting project:", error);
    }

    setDeleteTranslationLoading(false);
  };

  return {
    isCreateModalOpen: isCreateTranslationOpen,
    isCreateLoading: isCreateTranslationLoading,
    isDeleteLoading: isDeleteTranslationLoading,
    selectedTranslationId,
    setSelectedTranslationId,
    onCreate: handleSubmit,
    onDelete: handleDelete,
    setCreateModalOpen: (open: boolean) => setCreateTranslationOpen(open),
  };
};
