import { gql } from '@apollo/client';

type TDeleteProfilesResult = {
  deleteProfiles: {
    ok: boolean;
  };
};

const DELETE_PROFILES = gql`
  mutation DeleteProfiles($profileIds: [ID!]!) {
    deleteProfiles(profileIds: $profileIds) {
      ok
    }
  }
`;

export { DELETE_PROFILES, type TDeleteProfilesResult };
