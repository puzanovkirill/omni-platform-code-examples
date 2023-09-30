import { gql } from '@apollo/client';

export type RegistrationInput = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
};

export type TSignUpResult = {
  registration: {
    ok: boolean;
  };
};

const SIGN_UP = gql`
  mutation SignUp($userInfo: RegistrationInput!) {
    registration(userInfo: $userInfo) {
      ok
    }
  }
`;

export { SIGN_UP };
