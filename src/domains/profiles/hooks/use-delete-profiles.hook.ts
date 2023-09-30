import { useCustomMutation } from '@3divi/shared-components';
import { useTranslation } from 'react-i18next';
import { GET_ACTIVITIES } from '../../activity';
import {
  GET_NOTIFICATIONS,
  GET_UNREAD_NOTIFICATION_COUNT,
} from '../../notification';
import {
  DELETE_PROFILES,
  GET_PROFILES_LIST,
  TDeleteProfilesResult,
} from '../requests';

type TProfilesCollectionsCache = {
  collectionItems: {
    __ref: string;
  }[];
  totalCount?: number;
};

function useDeleteProfiles(
  errorToast: string,
  successToast: string,
  onClose?: () => void
) {
  const { t } = useTranslation('common');
  const [deleteProfilesRequest, { loading, error }] =
    useCustomMutation<TDeleteProfilesResult>(DELETE_PROFILES, {
      errorToast,
      successToast,
      loadingToast: t('Deleting'),
    });

  const deleteProfiles = (profileIds: string[]) => {
    if (onClose) onClose();
    deleteProfilesRequest({
      variables: {
        profileIds,
      },
      update: (cache) => {
        cache.modify({
          fields: {
            profiles: (
              existingProfilesRefs: TProfilesCollectionsCache,
              { readField }
            ) => {
              if (existingProfilesRefs.collectionItems) {
                return {
                  ...existingProfilesRefs,
                  collectionItems: existingProfilesRefs.collectionItems.filter(
                    (ref) => !profileIds.includes(readField('id', ref)!)
                  ),
                };
              }
              return existingProfilesRefs;
            },
          },
        });
      },
      refetchQueries: [
        GET_PROFILES_LIST,
        GET_NOTIFICATIONS,
        GET_ACTIVITIES,
        GET_UNREAD_NOTIFICATION_COUNT,
      ],
    });
  };

  return {
    loading,
    deleteProfiles,
    error,
  };
}

export { useDeleteProfiles };
