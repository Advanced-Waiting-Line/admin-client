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

export const UPDATE_PROBLEM = gql`
  mutation updateProblem($token: String!, $problemId: String!, $name: String!, $description: String!, $duration: Int!) {
    updateProblem(token: $token, problemId: $problemId, name: $name, description: $description, duration: $duration) {
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

export const REMOVE_FROM_QUEUE = gql`
  mutation removeFromQueue($token: String!, $queueId: String!) {
    removeFromQueue(token: $token, queueId: $queueId) {
      message
    }
  }
`;