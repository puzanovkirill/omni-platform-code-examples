import { gql } from '@apollo/client';
import { TProfileInfo } from './get-one-profile.gql';

export type TProfile = {
  id: string;
  creationDate: string;
  lastModified: string;
  avatar: string;
  info: TProfileInfo;
};
export type TCreateProfileResponse = {
  createProfile: {
    ok: boolean;
    isCreated: boolean;
    profile: TProfile;
  };
};

const CREATE_PROFILE = gql`
  mutation CreateProfile($image: CustomBinaryType!, $ids: [ID!]) {
    createProfile(image: $image, profileData: { profileGroupIds: $ids }) {
      ok
      profile {
        id
        info
        creationDate
        lastModified
        avatar
      }
      isCreated
    }
  }
`;

export { CREATE_PROFILE };
