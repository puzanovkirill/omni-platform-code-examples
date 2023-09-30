import { gql } from '@apollo/client';
import { TProfileFullInfo } from './get-one-profile.gql';

type TAddProfilesToGroupResult = {
  addProfilesToGroups: {
    ok: boolean;
    profiles: TProfileFullInfo[];
  };
};

const ADD_PROFILES_TO_GROUP = gql`
  mutation AddProfilesToGroup($groupIds: [ID!]!, $profilesIds: [ID!]!) {
    addProfilesToGroups(groupIds: $groupIds, profilesIds: $profilesIds) {
      ok
      profiles {
        avatar
        id
        activitiesCount
        lastActivityDate
        info
        profileGroups {
          id
          title
          info
        }
      }
    }
  }
`;
export { ADD_PROFILES_TO_GROUP, type TAddProfilesToGroupResult };
