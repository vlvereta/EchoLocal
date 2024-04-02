import { ExtendedOrganization, Organization } from "./types/entities";

export const mockedOrganizationsList: Organization[] = [
  {
    id: "1",
    name: "Awesome Organization 1",
    ownerId: "0",
  },
  {
    id: "2",
    name: "Awesome Organization 2",
    ownerId: "0",
  },
  {
    id: "3",
    name: "Awesome Organization 3",
    ownerId: "0",
  },
  {
    id: "4",
    name: "Awesome Organization 4",
    ownerId: "0",
  },
  {
    id: "5",
    name: "Awesome Organization 5",
    ownerId: "0",
  },
];

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