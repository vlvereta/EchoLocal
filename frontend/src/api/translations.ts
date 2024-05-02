import { apiURL } from "..";

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
