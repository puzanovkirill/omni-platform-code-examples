import { gql } from '@apollo/client';

type TRemoveProfilesField = {
  removeProfilesField: {
    ok: boolean;
  };
};

const REMOVE_PROFILES_FIELD = gql`
  mutation RemoveProfilesField($name: String!) {
    removeProfilesField(fieldInput: { name: $name }) {
      ok
    }
  }
`;

export { REMOVE_PROFILES_FIELD, type TRemoveProfilesField };
