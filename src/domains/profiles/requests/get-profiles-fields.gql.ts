import { gql } from '@apollo/client';

type TProfilesSettings = {
  extraFields: string[];
  id: string;
};

type TGetProfilesFields = {
  profileSettings: TProfilesSettings;
};

const GET_PROFILES_FIELDS = gql`
  query GetProfilesFields {
    profileSettings {
      extraFields
      id
    }
  }
`;

export { GET_PROFILES_FIELDS, type TGetProfilesFields, type TProfilesSettings };
