import { gql } from "apollo-boost";

export const GET_TODAY_LOG = gql`
  query GetTodayLog($token: String!) {
    getTodayLog(token: $token) {
      _id
      userId {
        firstName
        lastName
        location {
          lat
          lng
        }
      }
      problem {
        name
      }
      duration
      checkIn
      status
    }
  }
`;

export const GET_COMPANY_PROBLEM = gql`
  query GetCompanyProblem($companyId: String!) {
    getCompanyProblem(companyId: $companyId) {
      _id
      name
      description
      duration
    }
  }
`;

export const GET_COMPANY_INFO = gql`
  query FindCompanyById($companyId: String!) {
    findCompanyById(companyId: $companyId) {
      openTime
      closeTime
      image
      email
      queue
      location {
        lat
        lng
      }
    }
  }
`;