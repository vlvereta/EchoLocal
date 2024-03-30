import { FunctionalComponent, h, Fragment } from "preact";

interface ProjectSettingsProps {
  onClose: () => void;
}

const ProjectSettings: FunctionalComponent<ProjectSettingsProps> = ({
  onClose,
}) => {
  return (
    <>
      <h2>Project Settings</h2>
      <button onClick={onClose}>CLOSE</button>
    </>
  );
};

export default ProjectSettings;
