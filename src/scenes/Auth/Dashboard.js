import React from 'react';
import { ArrowUp } from 'react-feather';
import moment from 'moment';
import './dashboard.css';

// <=========== Graphql ===========>
import { useQuery } from '@apollo/react-hooks';
import { GET_TODAY_LOG } from '../../services/graphql/query';

export default _ => {
  const { loading, error, data } = useQuery(GET_TODAY_LOG, {
    variables: {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDg4NDY1NjAyZjY1NTExNmI1MTIzOWUiLCJlbWFpbCI6ImNvbXBhbnkxQG1haWwuY29tIiwiaWF0IjoxNTY5MjEzNTc4LCJleHAiOjE1Njk0Mjk1Nzh9.QZZ1gXJwziTFUCiTWMGKCn1Vkfy2fBgZ_n117g814jk",
    }
  });

  if (loading) {
    return (
      <div id="right-dashboard">
        <p>Loading ...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div id="right-dashboard">
        <p>error :( dashboard</p>
      </div>
    );
  }

  return (
    <div id="right-dashboard">

      <div id="total-customer">
        <div id="head-total-customer">
          <span>Daily Customers</span>
        </div>
        <div id="body-total-customer">
          <div id="body-total-exp">
            <ArrowUp />
            <h3>25 people</h3>
            <div className="flex-spacer"></div>
            <div id="percen-total">
              <p>56%</p>
            </div>
          </div>
          <div id="progress-bar">
            <div id="progress" style={{ width: '56%' }}></div>
          </div>
        </div>
      </div>
      
      <div id="total-customer">
        <div id="head-total-customer">
          <span>Weekly Customers</span>
        </div>
        <div id="body-total-customer">
          <div id="body-total-exp">
            <ArrowUp />
            <h3>40 people</h3>
            <div className="flex-spacer"></div>
            <div id="percen-total">
              <p>20%</p>
            </div>
          </div>
          <div id="progress-bar">
            <div id="progress" style={{ width: '20%' }}></div>
          </div>
        </div>
      </div>

      <div id="customer-box-list">
        <div id="header-recent-customer">
          <div id="just-block"></div>
          <span>Recent Customers</span>
        </div>
        <div id="body-customer-list">
          {data.getTodayLog.map(el => (
            <div id="customer-list" key={el._id}>
              <div id="customer-pic">
                <img src="assets/male.png" alt="profile"/>
              </div>
              <div id="customer-desc">
                <h5>{`${el.userId.firstName} ${el.userId.lastName}`}</h5>
                <p>{el.problem.name}</p>
              </div>
              <div className="flex-spacer"></div>
              <div id="customer-time">
                <div id="circle"></div>
                <p>{moment(el.checkIn).format('LT')}</p>
              </div>
              <div className="flex-spacer"></div>
              <div id="button-action">
                <button id="btn-late">Come Late</button>
                <button id="btn-done">Done</button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};