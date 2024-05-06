import { useState } from "preact/hooks";

import { Project } from "../types/entities";
import { useAuth } from "../components/AuthContext";
import { CreateProjectPayload } from "../types/requests";
import { deleteProject, updateProject } from "../api/projects";
import { createOrganizationProject } from "../api/organizations";

interface UseProject {
  isCreateModalOpen: boolean;
  isCreateLoading: boolean;
  isUpdateLoading: boolean;
  isDeleteLoading: boolean;
  selectedProjectId?: number;
  setSelectedProjectId: (id?: number) => void;
  setCreateModalOpen: (open: boolean) => void;
  onCreate: (payload: CreateProjectPayload) => void;
  onUpdate: (id: number, payload: CreateProjectPayload) => void;
  onDelete: (id: number) => void;
}

export const useProject = ({
  organizationId,
  onCreateSuccess,
  onUpdateSuccess,
  onDeleteSuccess,
}: {
  organizationId: number;
  onCreateSuccess?: (project: Project) => void;
  onUpdateSuccess?: (project: Project) => void;
  onDeleteSuccess?: (id: number) => void;
}): UseProject => {
  const { token } = useAuth();

  const [isCreateProjectOpen, setCreateProjectOpen] = useState<boolean>(false);
  const [isCreateProjectLoading, setCreateProjectLoading] =
    useState<boolean>(false);
  const [isUpdateProjectLoading, setUpdateProjectLoading] =
    useState<boolean>(false);
  const [isDeleteProjectLoading, setDeleteProjectLoading] =
    useState<boolean>(false);

  const [selectedProjectId, setSelectedProjectId] = useState<number>();

  const handleCreate = async (payload: CreateProjectPayload) => {
    setCreateProjectLoading(true);

    try {
      const project = await createOrganizationProject(
        token,
        organizationId,
        payload
      );
      onCreateSuccess(project);
    } catch (error) {
      console.error("Error while creating project:", error);
    }

    setCreateProjectLoading(false);
  };

  const handleUpdate = async (id: number, payload: CreateProjectPayload) => {
    setUpdateProjectLoading(true);

    try {
      const project = await updateProject(token, id, payload);
      onUpdateSuccess?.(project);
    } catch (error) {
      console.error("Error while updating project:", error);
    }

    setUpdateProjectLoading(false);
  };

  const handleDelete = async (id: number) => {
    setDeleteProjectLoading(true);

    try {
      await deleteProject(token, id);
      onDeleteSuccess(id);
    } catch (error) {
      console.error("Error while deleting project:", error);
    }

    setDeleteProjectLoading(false);
  };

  return {
    isCreateModalOpen: isCreateProjectOpen,
    isCreateLoading: isCreateProjectLoading,
    isUpdateLoading: isUpdateProjectLoading,
    isDeleteLoading: isDeleteProjectLoading,
    selectedProjectId,
    setSelectedProjectId,
    onCreate: handleCreate,
    onUpdate: handleUpdate,
    onDelete: handleDelete,
    setCreateModalOpen: (open: boolean) => setCreateProjectOpen(open),
  };
};
