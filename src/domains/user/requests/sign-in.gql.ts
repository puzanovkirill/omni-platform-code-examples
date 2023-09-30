import { gql } from '@apollo/client';

const SIGN_IN = gql`
  mutation SignIn($login: String!, $password: String!) {
    login(login: $login, password: $password) {
      ok
      me {
        workspaces {
          id
        }
      }
    }
  }
`;

export { SIGN_IN };
