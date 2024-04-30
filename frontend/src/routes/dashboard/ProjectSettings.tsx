import { FunctionalComponent, h } from "preact";

interface ProjectSettingsProps {
  projectId: number;
  onDelete: (projectId: number) => void;
  onClose: () => void;
}

const ProjectSettings: FunctionalComponent<ProjectSettingsProps> = ({
  projectId,
  onDelete,
  onClose,
}) => (
  <div>
    <h2 class="subtitle has-text-weight-bold">Project Settings</h2>
    <div class="buttons">
      <button
        type="button"
        class="button is-danger"
        onClick={() => onDelete(projectId)}
      >
        DELETE
      </button>
      <button type="button" class="button" onClick={onClose}>
        CLOSE
      </button>
    </div>
  </div>
);

export default ProjectSettings;
