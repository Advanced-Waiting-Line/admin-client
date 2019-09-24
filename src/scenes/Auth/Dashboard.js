import React from 'react';
import { ArrowUp } from 'react-feather';
import moment from 'moment';
import Loading from '../Loading/';
import './dashboard.css';

// <=========== Graphql ===========>
import { useQuery } from '@apollo/react-hooks';
import { GET_COMPANY_INFO } from '../../services/graphql/query';

export default _ => {
  const { loading, error, data } = useQuery(GET_COMPANY_INFO, {
    variables: {
      companyId: localStorage.getItem('ccid'),
    }
  });

  if (loading) {
    return (
      <div id="right-dashboard">
        <Loading/>
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

  console.log(data);

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
          {data.findCompanyById.queue.map(el => (
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