import { gql } from '@apollo/client';
import { TProfileInfo } from './get-one-profile.gql';

type TProfileByActivityId = {
  createProfileByActivity: {
    ok: boolean;
    isCreated: boolean;
    profile: {
      id: string;
      avatar: string;
      info: TProfileInfo;
    };
  };
};

const CREATE_PROFILE_BY_ACTIVITY_ID = gql`
  mutation CreateProfileByActivityId($id: ID!) {
    createProfileByActivity(activityId: $id) {
      ok
      isCreated
      profile {
        id
        avatar
        info
      }
    }
  }
`;

export { CREATE_PROFILE_BY_ACTIVITY_ID, type TProfileByActivityId };
