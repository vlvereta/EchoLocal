import {
  ExtendedOrganization,
  ExtendedProject,
  TranslationSheet,
} from "./types/entities";

export const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export const getProjectFromOrganization = (
  organization: ExtendedOrganization,
  projectId: number
): ExtendedProject | undefined =>
  organization?.projects?.find(({ id }) => id === projectId);

export const removeProjectFromOrganization = (
  organization: ExtendedOrganization,
  projectId: number
): ExtendedOrganization => ({
  ...organization,
  projects: organization.projects.filter(({ id }) => id !== projectId),
});

export const getTranslationFromOrganization = (
  organization: ExtendedOrganization,
  projectId: number,
  translationId: number
): TranslationSheet | undefined => {
  const project = getProjectFromOrganization(organization, projectId);
  return project?.translations?.find(({ id }) => id === translationId);
};

export const setTranslationToOrganizationProject = (
  organization: ExtendedOrganization,
  projectId: number,
  translation: TranslationSheet
): ExtendedOrganization => ({
  ...organization,
  projects: organization.projects.map((project) =>
    project.id === projectId
      ? { ...project, translations: project.translations.concat([translation]) }
      : project
  ),
});

export const removeTranslationFromOrganizationProject = (
  organization: ExtendedOrganization,
  projectId: number,
  translationId: number
): ExtendedOrganization => ({
  ...organization,
  projects: organization.projects.map((project) =>
    project.id === projectId
      ? {
          ...project,
          translations: project.translations.filter(
            ({ id }) => id !== translationId
          ),
        }
      : project
  ),
});
