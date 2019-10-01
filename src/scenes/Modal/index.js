import React from 'react';
import './style.css';

export default ({ targetId, confirm, show }) => {
  return (
    <div className="bg-modal">
      <div id="confirm-box">
        <div id="confirm-text">
          <h3>Are you sure?</h3>
        </div>
        <div className="modal-btn-box">
          <button className="cancel-btn" onClick={_ => show(false)}>Cancel</button>
          <button className="confirm-btn" onClick={_ => {confirm(targetId); show(false)}}>Sure</button>
        </div>
      </div>
    </div>
  )
};