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
  language: string;
  projectId: string;
  lastUpdated: string;
}

export interface TranslationKey {
  id: string;
  sheetId: string;
  key: string;
  value: string;
}
