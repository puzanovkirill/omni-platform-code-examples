/* eslint-disable no-underscore-dangle */
import { gql } from '@apollo/client';
import { useCustomMutation } from '@3divi/shared-components';
import { TUpdateProfileOutput, UPDATE_PROFILE_DESCRIPTION } from '../requests';

type TNotificationCache = {
  description: string;
  profileId: string;
};

type TNotificationsCollectionsCache = {
  collectionItems: {
    __ref: string;
  }[];
  totalCount?: number;
};

const useUpdateProfileData = () => {
  const [updateProfileDataRequest, { loading, error }] =
    useCustomMutation<TUpdateProfileOutput>(UPDATE_PROFILE_DESCRIPTION);

  const updateProfileData = (description: string, profileId: string) => {
    updateProfileDataRequest({
      variables: {
        profileId,
        info: { description },
      },
      update(cache, { data }) {
        if (!data?.updateProfile.ok) return;

        cache.modify({
          fields: {
            notifications: (notifications: TNotificationsCollectionsCache) => {
              if (notifications.collectionItems) {
                notifications.collectionItems.forEach((notification) => {
                  cache.updateFragment(
                    {
                      id: notification.__ref,
                      fragment: gql`
                        fragment MyNotification on NotificationOutput {
                          description
                          profileId
                        }
                      `,
                    },
                    (cachedNotification: TNotificationCache | null) => {
                      if (cachedNotification?.profileId === profileId) {
                        return {
                          ...cachedNotification,
                          description,
                        };
                      }
                      return null;
                    }
                  );
                });
              }
              return { ...notifications };
            },
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
    updateProfileData,
    error,
  };
};

export { useUpdateProfileData };
