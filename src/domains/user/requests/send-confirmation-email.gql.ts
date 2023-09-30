import { gql } from '@apollo/client';

const SEND_CONFIRMATION_EMAIL = gql`
  mutation SendConfirmationEmail($email: String!) {
    sendConfirmationEmail(email: $email) {
      ok
    }
  }
`;

export { SEND_CONFIRMATION_EMAIL };
