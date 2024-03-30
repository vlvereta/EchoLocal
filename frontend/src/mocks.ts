import { ExtendedOrganization } from "./types";

export const mockedExtendedOrganization: ExtendedOrganization = {
  id: "111",
  name: "Awesome Organization",
  ownerId: "111",
  projects: [
    {
      id: "123",
      name: "Project 1",
      translations: [
        {
          id: "0",
        },
        {
          id: "1",
        },
        {
          id: "2",
        },
      ],
    },
    {
      id: "234",
      name: "Project 2",
      translations: [
        {
          id: "0",
        },
        {
          id: "1",
        },
      ],
    },
  ],
};
