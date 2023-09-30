import { gql } from '@apollo/client';

const SIGN_OUT = gql`
  mutation SignOut {
    logout {
      ok
    }
  }
`;
export { SIGN_OUT };
