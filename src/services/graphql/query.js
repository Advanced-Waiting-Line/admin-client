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
// ccid 5d8a49d006f7711b571f857c
// prob id 5d8a4a5406f7711b571f857d
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
      _id
      openTime
      name
      address
      closeTime
      image
      location {
        lat
        lng
      }
      email
      queue {
        _id
        userId {
          _id
          firstName
          lastName
          image
          email
          password
          location {
            lat
            lng
          }
        }
        problem {
          name
          duration
        }
        duration
        checkIn
        status
      }
    }
  }
`;