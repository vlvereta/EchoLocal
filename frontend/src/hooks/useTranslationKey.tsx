import { useState } from "preact/hooks";

import {
  deleteTranslationKey,
  updateTranslationKey,
} from "../api/translationKeys";
import { useAuth } from "../components/AuthContext";
import { createTranslationKey } from "../api/translations";
import { TranslationKey, TranslationKeyData } from "../types/entities";

interface UseTranslationKeyCreate {
  isCreateLoading: boolean;
  isUpdateLoading: boolean;
  isDeleteLoading: boolean;
  onCreate: (payload: TranslationKeyData) => void;
  onUpdate: (id: number, payload: TranslationKeyData) => void;
  onDelete: (id: number) => void;
}

export const useTranslationKey = ({
  translationId,
  onCreateSuccess,
  onUpdateSuccess,
  onDeleteSuccess,
}: {
  translationId: number;
  onCreateSuccess?: (key: TranslationKey) => void;
  onUpdateSuccess?: (key: TranslationKey) => void;
  onDeleteSuccess?: (id: number) => void;
}): UseTranslationKeyCreate => {
  const { token } = useAuth();

  const [isCreateTranslationKeyLoading, setCreateTranslationKeyLoading] =
    useState<boolean>(false);
  const [isUpdateTranslationKeyLoading, setUpdateTranslationKeyLoading] =
    useState<boolean>(false);
  const [isDeleteTranslationKeyLoading, setDeleteTranslationKeyLoading] =
    useState<boolean>(false);

  const handleCreate = async (data: TranslationKeyData) => {
    setCreateTranslationKeyLoading(true);

    try {
      const translationKey = await createTranslationKey(
        token,
        translationId,
        data
      );
      onCreateSuccess?.(translationKey);
    } catch (error) {
      console.error("Error while creating translation key:", error);
    }

    setCreateTranslationKeyLoading(false);
  };

  const handleUpdate = async (id: number, data: TranslationKeyData) => {
    setUpdateTranslationKeyLoading(true);

    try {
      const translationKey = await updateTranslationKey(token, id, data);
      onUpdateSuccess?.(translationKey);
    } catch (error) {
      console.error("Error while updating translation key:", error);
    }

    setUpdateTranslationKeyLoading(false);
  };

  const handleDelete = async (id: number) => {
    setDeleteTranslationKeyLoading(true);

    try {
      await deleteTranslationKey(token, id);
      onDeleteSuccess?.(id);
    } catch (error) {
      console.error("Error while deleting translation key:", error);
    }

    setDeleteTranslationKeyLoading(false);
  };

  return {
    isCreateLoading: isCreateTranslationKeyLoading,
    isUpdateLoading: isUpdateTranslationKeyLoading,
    isDeleteLoading: isDeleteTranslationKeyLoading,
    onCreate: handleCreate,
    onUpdate: handleUpdate,
    onDelete: handleDelete,
  };
};
