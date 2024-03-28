export enum LocalStorageItem {
  Token = "token",
}

export interface Organization {
  id: string;
  name: string;
  ownerId: string;
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
