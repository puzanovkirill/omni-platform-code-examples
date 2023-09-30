import { useCustomMutation } from '@3divi/shared-components';
import { TUpdateProfileData, UPDATE_PROFILE } from '../requests';

function useUpdateProfile(
  successToast?: string,
  errorToast?: string,
  loadingToast?: string
) {
  const [updateProfileReq, { loading }] = useCustomMutation(UPDATE_PROFILE, {
    successToast,
    errorToast,
    loadingToast,
  });

  function updateProfile(
    profileId: string,
    values: TUpdateProfileData,
    successCallback?: () => void
  ) {
    updateProfileReq({
      variables: {
        profileId,
        profileData: values,
      },
    }).then(() => {
      if (successCallback) successCallback();
    });
  }

  return { updateProfile, loading };
}

export { useUpdateProfile };
