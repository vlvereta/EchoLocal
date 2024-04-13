import {
  ExtendedOrganization,
  Organization,
  TranslationKey,
} from "./types/entities";

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
      name: "Project 123",
      translations: [
        {
          id: "0",
          language: "English",
          projectId: "123",
          lastUpdated: "",
        },
        {
          id: "1",
          language: "Spanish",
          projectId: "123",
          lastUpdated: "",
        },
        {
          id: "2",
          language: "Italian",
          projectId: "123",
          lastUpdated: "",
        },
      ],
    },
    {
      id: "234",
      name: "Project 234",
      translations: [
        {
          id: "0",
          language: "English",
          projectId: "234",
          lastUpdated: "",
        },
        {
          id: "1",
          language: "Mandarin",
          projectId: "234",
          lastUpdated: "",
        },
      ],
    },
  ],
};

export const mockedTranslationKeys: TranslationKey[] = [
  {
    id: "1",
    sheetId: "1",
    key: "sample_key_1",
    value: "Sample 1",
  },
  {
    id: "2",
    sheetId: "1",
    key: "sample_key_2",
    value: "Sample 2",
  },
  {
    id: "3",
    sheetId: "1",
    key: "sample_key_3",
    value: "Sample 3",
  },
];
