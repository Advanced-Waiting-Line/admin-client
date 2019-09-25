import React, { useState } from 'react';
import { Settings, Bell, ChevronDown, User, LogOut} from 'react-feather';
import Loading from '../Loading/';

export default _ => {
  const [dropdown, setDropdown] = useState(false);

  const logout = _ => {
    
  }

  return (
    <div id="dashboard-nav">
      <div id="dashboard-nav-right">
        <button className="btn-no-text">
          <Bell size="17" />
          <ChevronDown size="15" />
        </button>
        <button className="btn-no-text" onClick={_ => setDropdown(!dropdown)}>
          <Settings size="17" />
          <ChevronDown size="15" />
        </button>
          {dropdown && 
            <div id="dropdown-setting">
              <div id="dropdown-head">
                <div id="dropdown-box-img">
                  <img src="assets/male.png" alt="profile"/>
                </div>
                <span>Full Name</span>
              </div>
              <div id="dropdown-body">
                <div id="dropdown-list">
                  <Settings size="15" />
                  <span>Setting</span>
                </div>
                <div id="dropdown-list">
                  <User size="15" />
                  <span>My Profile</span>
                </div>
                <div id="dropdown-list">
                  <LogOut size="15" />
                  <span>Log Out</span>
                </div>
              </div>
            </div>
          }
      </div>
    </div>
  )
}