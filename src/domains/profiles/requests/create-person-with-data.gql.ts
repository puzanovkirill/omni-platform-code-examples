import { gql } from '@apollo/client';
import { TProfileFullInfo } from './get-one-profile.gql';

type TCreatePersonWithData = {
  createProfile: {
    isCreated: boolean;
    ok: boolean;
    profile: TProfileFullInfo;
  };
};

const CREATE_PERSON_WITH_DATA = gql`
  mutation CreatePersonWithData(
    $image: CustomBinaryType
    $fields: [ExtraFieldInput!]
    $profileGroupIds: [ID]
  ) {
    createProfile(
      image: $image
      profileData: { fields: $fields, profileGroupIds: $profileGroupIds }
    ) {
      isCreated
      ok
      profile {
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

export { CREATE_PERSON_WITH_DATA, type TCreatePersonWithData };
