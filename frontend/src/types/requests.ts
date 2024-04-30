import { Organization, Project, TranslationSheet } from "./entities";

export interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SigninPayload {
  email: string;
  password: string;
}

export interface SigninResponse {
  token: string;
}

export interface GetOrganizationPayload {
  id: Organization["id"];
}

export interface CreateOrganizationPayload {
  name: Organization["name"];
}

export interface DeleteOrganizationPayload {
  id: Organization["id"];
}

export type CreateProjectPayload = Pick<Project, "name" | "description">;

export type CreateTranslationPayload = Pick<TranslationSheet, "language">;
