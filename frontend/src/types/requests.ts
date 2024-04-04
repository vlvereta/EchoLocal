import { Organization } from "./entities";

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
