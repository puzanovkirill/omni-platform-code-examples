import { GraphQLError } from 'graphql';
import { useCustomMutation } from '@3divi/shared-components';
import { SIGN_IN } from '..';
import { useAuthentification } from '../../../hooks';
import { useWorkspace } from '../../workspaces';

type SignInData = {
  login: string;
  password: string;
};

type TWorkspace = {
  id: string;
};

type TUseSignIn = {
  signIn: (SignInData: SignInData) => void;
  loading: boolean;
  error: GraphQLError | undefined;
};

type TSignInData = {
  login: {
    me: {
      workspaces: TWorkspace[];
    };
  };
};

function useSignIn(): TUseSignIn {
  const { setAuthentificated } = useAuthentification();
  const { setWorkspace } = useWorkspace();

  const onCompleted = (data: TSignInData) => {
    if (data) {
      const workspaces = data?.login?.me?.workspaces ?? [];
      if (workspaces.length === 1 && workspaces[0]) {
        setWorkspace(workspaces[0].id);
        setAuthentificated(true);
      } else {
        setAuthentificated(true);
      }
    }
  };

  const [signInRequest, { loading, error }] = useCustomMutation(SIGN_IN, {
    onCompleted,
  });

  const signIn = (SignInData: SignInData): void => {
    const variables = {
      login: SignInData.login,
      password: SignInData.password,
    };
    signInRequest({ variables });
  };

  return {
    signIn,
    loading,
    error,
  };
}

export { useSignIn };
