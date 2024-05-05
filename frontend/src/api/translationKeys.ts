import { apiURL } from "..";
import { TranslationKeyData } from "../types/entities";

export const updateTranslationKey = async (
  token: string,
  translationKeyId: number,
  { value }: TranslationKeyData
) => {
  const response = await fetch(
    `${apiURL}/translation_keys/${translationKeyId}`,
    {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value }),
    }
  );
  return response.json();
};

export const deleteTranslationKey = async (
  token: string,
  translationKeyId: number
) => {
  await fetch(`${apiURL}/translation_keys/${translationKeyId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
