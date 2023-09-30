import { gql } from '@apollo/client';

type TUpdatePersonAvatarResult = {
  updateProfile: {
    ok: boolean;
  };
};

const UPDATE_PERSON_AVATAR = gql`
  mutation UpdatePersonAvatar($personId: ID!, $avatarId: String!) {
    updateProfile(
      profileId: $personId
      profileData: { info: { avatar_id: $avatarId, main_sample_id: $avatarId } }
    ) {
      ok
    }
  }
`;

export { UPDATE_PERSON_AVATAR, type TUpdatePersonAvatarResult };
