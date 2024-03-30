import { apiURL } from "../index";
import {
  GetOrganizationPayload,
  CreateOrganizationPayload,
  DeleteOrganizationPayload,
  Organization,
  ExtendedOrganization,
} from "../types";

export const getOrganizations = async (
  token: string
): Promise<Organization[]> => {
  const response = await fetch(`${apiURL}/organizations`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const getOrganization = async (
  token: string,
  { id }: GetOrganizationPayload
): Promise<ExtendedOrganization> => {
  const response = await fetch(`${apiURL}/organizations/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const createOrganization = async (
  token: string,
  payload: CreateOrganizationPayload
): Promise<Organization> => {
  const response = await fetch(`${apiURL}/organizations`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return response.json();
};

export const deleteOrganization = async (
  token: string,
  { id }: DeleteOrganizationPayload
): Promise<void> => {
  await fetch(`${apiURL}/organizations/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
