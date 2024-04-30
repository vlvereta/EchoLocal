import { ExtendedOrganization, ExtendedProject } from "./types/entities";

export const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export const getExtendedProjectFromOrganization = (
  organization: ExtendedOrganization,
  projectId: number
): ExtendedProject | undefined =>
  organization?.projects?.find(({ id }) => id === projectId);
