import { apiURL } from "..";
import { TranslationKey, TranslationKeyData } from "../types/entities";

export const deleteTranslation = async (
  token: string,
  translationId: number
): Promise<void> => {
  await fetch(`${apiURL}/translations/${translationId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const getTranslationKeys = async (
  token: string,
  translationId: number
): Promise<TranslationKey[]> => {
  const response = await fetch(`${apiURL}/translations/${translationId}/keys`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const createTranslationKey = async (
  token: string,
  translationId: number,
  payload: TranslationKeyData
): Promise<TranslationKey> => {
  const response = await fetch(`${apiURL}/translations/${translationId}/keys`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return response.json();
};
