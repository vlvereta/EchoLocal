import { FunctionalComponent, h } from "preact";

interface ProjectSettingsProps {
  onClose: () => void;
}

const ProjectSettings: FunctionalComponent<ProjectSettingsProps> = ({
  onClose,
}) => (
  <div>
    <h2 class="subtitle has-text-weight-bold">Project Settings</h2>
    <div class="buttons">
      <button type="button" class="button" onClick={onClose}>
        CLOSE
      </button>
    </div>
  </div>
);

export default ProjectSettings;
