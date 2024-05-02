import { apiURL } from "..";
import { TranslationSheet } from "../types/entities";
import { CreateTranslationPayload } from "../types/requests";

export const deleteProject = async (
  token: string,
  projectId: number
): Promise<void> => {
  await fetch(`${apiURL}/projects/${projectId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const createProjectTranslation = async (
  token: string,
  projectId: number,
  payload: CreateTranslationPayload
): Promise<TranslationSheet> => {
  const response = await fetch(`${apiURL}/projects/${projectId}/translations`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return response.json();
};
