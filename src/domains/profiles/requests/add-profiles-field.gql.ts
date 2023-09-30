import { gql } from '@apollo/client';

type TAddProfilesField = {
  addProfilesField: {
    ok: boolean;
  };
};

const ADD_PROFILES_FIELD = gql`
  mutation AddProfilesField($name: String!) {
    addProfilesField(fieldInput: { name: $name }) {
      ok
    }
  }
`;

export { ADD_PROFILES_FIELD, type TAddProfilesField };
