import { useCustomQuery } from '@3divi/shared-components';
import { GET_ONE_PROFILE, TOneProfileFullInfo } from '../requests';

const useGetOnePerson = (id: string) => {
  const { data, loading } = useCustomQuery<TOneProfileFullInfo>(
    GET_ONE_PROFILE,
    {
      variables: {
        id,
        profileId: id,
      },
      fetchPolicy: 'cache-and-network',
      isPolling: true,
    }
  );

  const profileFullInfo = data?.profiles.collectionItems[0];
  const profileGroups = profileFullInfo?.profileGroups ?? [];

  return {
    profileFullInfo,
    profileGroups,
    loading,
  };
};
export { useGetOnePerson };
