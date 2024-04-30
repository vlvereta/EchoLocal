export enum LocalStorageItem {
  Token = "token",
}

export interface Organization {
  id: number;
  name: string;
  ownerId: string;
}

export interface ExtendedOrganization extends Organization {
  projects: ExtendedProject[];
}

export interface Project {
  id: number;
  name: string;
  description?: string;
}

export interface ExtendedProject extends Project {
  translations: TranslationSheet[];
}

export interface TranslationSheet {
  id: number;
  language: string;
  projectId: string;
  lastUpdated: string;
}

export interface TranslationKey {
  id: number;
  sheetId: string;
  key: string;
  value: string;
}
