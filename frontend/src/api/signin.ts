import { apiURL } from "..";
import { SigninPayload, SigninResponse } from "../types/requests";

export const signin = async (
  payload: SigninPayload
): Promise<SigninResponse> => {
  const response = await fetch(`${apiURL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return response.json();
};
