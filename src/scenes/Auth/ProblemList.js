import React from 'react';
import { Edit, Trash } from 'react-feather';
import './problemList.css';

export default _ => {
  return (
    <div id="right-problem-list">
      <div id="problem-list-box">
        <div id="problem-list-head-box">
          <div className="problem-list-head">
            <span>No.</span>
          </div>
          <div className="problem-list-head">
            <span>Problem</span>
          </div>
          <div className="problem-list-head">
            <span>Description</span>
          </div>
          <div className="problem-list-head">
            <span>Time Required</span>
          </div>
          <div className="problem-list-head">
            <span>Actions</span>
          </div>
        </div>
        <div className="problem-list">
          <div className="problem-list-num">
            <span>1</span>
          </div>
          <div className="problem-list-name">
            <span>Card Issue</span>
          </div>
          <div className="problem-list-desc">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga voluptatum amet velit explicabo, nulla tempore nesciunt! Doloremque, corrupti voluptate? Fugiat corrupti ratione vel distinctio cumque obcaecati quclassNameem alias debitis atque.</p>
          </div>
          <div className="problem-list-time">
            <span>1 Hour</span>
          </div>
          <div className="problem-list-actions">
            <button className="problem-edit"><Edit size="20" color="white" /></button>
            <button className="problem-del"><Trash size="20" color="white" /></button>
          </div>
        </div>

      </div>
    </div>
  )
}