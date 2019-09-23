import { gql } from "apollo-boost";

export const GET_TODAY_LOG = gql`
  query GetTodayLog($token: String!) {
    getTodayLog(token: $token) {
      _id
      companyId {
        email
        openTime
        closeTime
      }
      userId {
        firstName
        lastName
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
      duration
    }
  }
`;