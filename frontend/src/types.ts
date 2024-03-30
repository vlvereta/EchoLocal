export enum LocalStorageItem {
  Token = "token",
}

export interface Organization {
  id: string;
  name: string;
  ownerId: string;
}

export interface ExtendedOrganization extends Organization {
  projects: ExtendedProject[];
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

export interface Project {
  id: string;
  name: string;
  description?: string;
}

export interface ExtendedProject extends Project {
  translations: TranslationSheet[];
}

export interface TranslationSheet {
  id: string;
}
