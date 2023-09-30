import { gql } from '@apollo/client';
import { TProfileInfo } from './get-one-profile.gql';

type TProfileAvatarsAndInfoItem = {
  id: string;
  avatar: string;
  info: TProfileInfo;
};

type TProfileAvatarsAndInfo = {
  profiles: {
    collectionItems: TProfileAvatarsAndInfoItem[];
  };
};

const GET_PROFILE_AVATARS_AND_INFO = gql`
  query GetProfileAvatarsAndInfo($ids: [ID]!) {
    profiles(ids: $ids) {
      collectionItems {
        id
        avatar
        info
      }
    }
  }
`;

export {
  GET_PROFILE_AVATARS_AND_INFO,
  type TProfileAvatarsAndInfo,
  type TProfileAvatarsAndInfoItem,
};
