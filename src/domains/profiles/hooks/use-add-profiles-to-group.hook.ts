/* eslint-disable @typescript-eslint/no-floating-promises */
import { useCustomMutation } from '@3divi/shared-components';
import { useTranslation } from 'react-i18next';
import {
  TAddProfilesToGroupResult,
  ADD_PROFILES_TO_GROUP,
  GET_PROFILES_LIST,
} from '../requests';

function useAddProfilesToGroup(shouldRefetch = true) {
  const { t } = useTranslation('pages');

  const [addProfilesToGroupRequest, { error, loading }] =
    useCustomMutation<TAddProfilesToGroupResult>(ADD_PROFILES_TO_GROUP, {
      successToast: t('Profiles.ProfilesAdded'),
      errorToast: t('Profiles.AddingToGroupError'),
      loadingToast: t(`common:Adding`),
    });

  const addProfilesToGroup = (groupId: string, profilesIds: string[]) => {
    addProfilesToGroupRequest({
      variables: { groupIds: [groupId], profilesIds },
      update(cache, { data }) {
        data?.addProfilesToGroups.profiles.forEach((profile) => {
          cache.modify({
            id: `ProfileOutput:${profile.id}`,
            fields: {
              profileGroups: () => [...profile.profileGroups],
            },
          });
        });
      },
      refetchQueries: shouldRefetch ? [GET_PROFILES_LIST] : [],
    });
  };

  return {
    addProfilesToGroup,
    loading,
    error,
  };
}

export { useAddProfilesToGroup };
