import { gql } from '@apollo/client';

type TUpdateProfileData = {
  profileGroupIds?: string[];
  info?: string;
};

const UPDATE_PROFILE = gql`
  mutation updateProfile($profileId: ID!, $profileData: ProfileInput!) {
    updateProfile(profileId: $profileId, profileData: $profileData) {
      ok
      profile {
        id
        activitiesCount
        lastActivityDate
        profileGroups {
          id
          title
          info
        }
        avatar
      }
    }
  }
`;

export { UPDATE_PROFILE, type TUpdateProfileData };
