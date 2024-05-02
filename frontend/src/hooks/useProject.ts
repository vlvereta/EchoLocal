import { useState } from "preact/hooks";

import { Project } from "../types/entities";
import { deleteProject } from "../api/projects";
import { useAuth } from "../components/AuthContext";
import { CreateProjectPayload } from "../types/requests";
import { createOrganizationProject } from "../api/organizations";

interface UseProject {
  isCreateModalOpen: boolean;
  isCreateLoading: boolean;
  isDeleteLoading: boolean;
  selectedProjectId?: number;
  setSelectedProjectId: (id?: number) => void;
  setCreateModalOpen: (open: boolean) => void;
  onCreate: (payload: CreateProjectPayload) => void;
  onDelete: (id: number) => void;
}

export const useProject = ({
  organizationId,
  onCreateSuccess,
  onDeleteSuccess,
}: {
  organizationId: number;
  onCreateSuccess: (project: Project) => void;
  onDeleteSuccess: (id: number) => void;
}): UseProject => {
  const { token } = useAuth();

  const [isCreateProjectOpen, setCreateProjectOpen] = useState<boolean>(false);
  const [isCreateProjectLoading, setCreateProjectLoading] =
    useState<boolean>(false);
  const [isDeleteProjectLoading, setDeleteProjectLoading] =
    useState<boolean>(false);

  const [selectedProjectId, setSelectedProjectId] = useState<number>();

  const handleSubmit = async (payload: CreateProjectPayload) => {
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
    isDeleteLoading: isDeleteProjectLoading,
    selectedProjectId,
    setSelectedProjectId,
    onCreate: handleSubmit,
    onDelete: handleDelete,
    setCreateModalOpen: (open: boolean) => setCreateProjectOpen(open),
  };
};
