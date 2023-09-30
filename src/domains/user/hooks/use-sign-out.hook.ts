import { GraphQLError } from 'graphql';
import { useCustomMutation } from '@3divi/shared-components';
import { useAuthentification } from '../../../hooks';
import { SIGN_OUT } from '../requests';

type TUseSignOut = {
  signOut: () => void;
  loading: boolean;
  error: GraphQLError | undefined;
};

function useSignOut(): TUseSignOut {
  const { setAuthentificated } = useAuthentification();
  const onCompleted = (): void => {
    setAuthentificated(false);
  };

  const [signOutRequest, { loading, error }] = useCustomMutation(SIGN_OUT, {
    onCompleted,
  });

  const signOut = (): void => {
    signOutRequest();
  };

  return {
    signOut,
    loading,
    error,
  };
}

export { useSignOut };
