import { useTranslation } from 'react-i18next';
import { useCustomMutation } from '@3divi/shared-components';
import { TUpdateProfileOutput, UPDATE_PROFILE_DESCRIPTION } from '../requests';

type TProfileInfoCache = {
  [key: string]: string | undefined;
};

const useUpdateProfileInfoCache = () => {
  const { t } = useTranslation('pages');
  const [updateProfileInfoRequest, { loading, error }] =
    useCustomMutation<TUpdateProfileOutput>(UPDATE_PROFILE_DESCRIPTION, {
      errorToast: t('Profiles.ProfileCard.UpdateInfoFailed'),
    });

  const updateProfileInfoCache = async (
    info: TProfileInfoCache,
    profileId: string
  ) => {
    const fields = Object.entries(info)
      .filter((item) => item[0] !== 'age')
      .map((item) => ({
        name: item[0],
        value: item[1] || null,
      }));

    await updateProfileInfoRequest({
      variables: {
        profileId,
        fields,
      },
      update(cache, { data }) {
        if (!data?.updateProfile.ok) return;
        cache.modify({
          id: `ProfileOutput:${profileId}`,
          fields: {
            info: (cachedInfo: TProfileInfoCache) => ({
              ...cachedInfo,
              ...info,
            }),
          },
        });
      },
      optimisticResponse: {
        updateProfile: {
          ok: true,
        },
      },
    });
  };

  return {
    loading,
    updateProfileInfoCache,
    error,
  };
};

export { useUpdateProfileInfoCache, type TProfileInfoCache };
