import { apiURL } from "..";
import { SignupPayload } from "../types/requests";

export const signup = async (payload: SignupPayload): Promise<void> => {
  await fetch(`${apiURL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};
