export enum LocalStorageItem {
  Token = "token",
}

export interface Organization {
  id: number;
  name: string;
  owner_id: number;
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
  project_id: number;
  updated_at: string;
}

export interface TranslationKey {
  id: number;
  sheet_id: number;
  key: string;
  value: string;
}
