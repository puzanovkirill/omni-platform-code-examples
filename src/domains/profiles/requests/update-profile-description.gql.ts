import { gql } from '@apollo/client';

type TUpdateProfileOutput = {
  updateProfile: {
    ok: boolean;
  };
};

const UPDATE_PROFILE_DESCRIPTION = gql`
  mutation UpdateProfileDescription(
    $info: JSON
    $fields: [ExtraFieldInput!]
    $profileId: ID
  ) {
    updateProfile(
      profileData: { fields: $fields, info: $info }
      profileId: $profileId
    ) {
      ok
    }
  }
`;

export { UPDATE_PROFILE_DESCRIPTION, type TUpdateProfileOutput };
