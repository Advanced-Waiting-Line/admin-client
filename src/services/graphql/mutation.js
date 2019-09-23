import { gql } from 'apollo-boost';

export const ADD_PROBLEM_LIST = gql`
  mutation createProblem($token: String!, $name: String!, $description: String!, $duration: Int!) {
    createProblem(token: $token, name: $name, description: $description, duration: $duration) {
      _id
      name
      description
      duration
    }
  }
`;