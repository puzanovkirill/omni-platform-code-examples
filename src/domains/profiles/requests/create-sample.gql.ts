import { gql } from '@apollo/client';

type TCreateSampleResult = {
  createSample: { id: string }[];
};

const CREATE_SAMPLE = gql`
  mutation CreateSample($image: CustomBinaryType!) {
    createSample(image: $image) {
      id
    }
  }
`;

export { CREATE_SAMPLE, type TCreateSampleResult };
