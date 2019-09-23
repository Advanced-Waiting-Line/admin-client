import { gql } from "apollo-boost";

export const STARTER_DASHBOARD = gql`
  query startedDashboard($token: String!, $companyId: String!) {
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
    },

    getCompanyProblem(companyId: $companyId) {
      _id
      name
      duration
    }
  }
`;

// export const GET_TODAY_LOG = gql`
//   query GetTodayLog($token: String!) {
//     getTodayLog(token: $token) {
//       _id
//       companyId {
//         email
//         openTime
//         closeTime
//       }
//       userId {
//         firstName
//         lastName
//       }
//       problem {
//         name
//       }
//       duration
//       checkIn
//       status
//     }
//   }
// `;

// export const GET_COMPANY_PROBLEM = gql`
//   query GetCompanyProblem($companyId: String!) {
//     getCompanyProblem(companyId: $companyId) {
//       _id
//       name
//       duration
//     }
//   }
// `;