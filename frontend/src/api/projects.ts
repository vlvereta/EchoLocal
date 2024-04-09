import { apiURL } from "..";

export const deleteProject = async (
  token: string,
  projectId: string
): Promise<void> => {
  await fetch(`${apiURL}/projects/${projectId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
