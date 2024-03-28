import { apiURL } from "../index";
import {
  GetOrganizationPayload,
  CreateOrganizationPayload,
  DeleteOrganizationPayload,
  Organization,
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
): Promise<Organization> => {
  const response = await fetch(`${apiURL}/organizations/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const createOrganization = async (
  token: string,
  { name }: CreateOrganizationPayload
): Promise<Organization> => {
  const response = await fetch(`${apiURL}/organizations`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: name,
  });
  return response.json();
};

export const deleteOrganization = async (
  token: string,
  { id }: DeleteOrganizationPayload
): Promise<void> => {
  const response = await fetch(`${apiURL}/organizations/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};
