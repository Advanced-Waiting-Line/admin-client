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

export const DELETE_PROBLEM = gql`
  mutation deleteProblem($token: String!, $problemId: String!) {
    deleteProblem(token: $token, problemId: $problemId) {
      _id
      name
    }
  }
`;

export const LOGIN = gql`
  mutation loginCompany($email: String!, $password: String!) {
    loginCompany(email: $email,
    password: $password,
  ) {
    token
    _id
  }
  }
`;