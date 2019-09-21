import React from 'react';
import { ArrowUp } from 'react-feather';
import './dashboard.css';

export default _ => {
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
          <div id="customer-list">
            <div id="customer-pic">
              <img src="assets/male.png" alt="profile"/>
            </div>
            <div id="customer-desc">
              <h5>The Fullname</h5>
              <p>Card issue</p>
            </div>
            <div className="flex-spacer"></div>
            <div id="customer-time">
              <div id="circle"></div>
              <p>14:30</p>
            </div>
            <div className="flex-spacer"></div>
            <div id="button-action">
              <button id="btn-late">Come Late</button>
              <button id="btn-done">Done</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};