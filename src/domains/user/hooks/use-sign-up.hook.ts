import { useNavigate } from 'react-router-dom';
import { useCustomMutation } from '@3divi/shared-components';
import { PATHNAMES } from '../../../consts';
import { RegistrationInput, SIGN_UP, TSignUpResult } from '../requests';

const useSignUp = () => {
  const navigate = useNavigate();
  const [signUpRequest, { loading, error }] =
    useCustomMutation<TSignUpResult>(SIGN_UP);

  const signUp = async (userInfo: RegistrationInput) => {
    const response = await signUpRequest({
      variables: {
        userInfo,
      },
    });
    if (response.data?.registration.ok) {
      navigate(`${PATHNAMES.email_confirm}?mail=${userInfo.email}`);
    }
  };

  return {
    loading,
    signUp,
    error,
  };
};

export { useSignUp };
