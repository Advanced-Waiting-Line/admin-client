import React, { useState } from 'react';
import { Settings, Bell, ChevronDown, User, LogOut} from 'react-feather';

export default ({ setIsLogin, data }) => {
  const [dropdown, setDropdown] = useState(false);

  const logout = _ => {
    localStorage.clear();
    setIsLogin(false);
  }

  return (
    <div id="dashboard-nav">
      <div className="flex-spacer"></div>
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
                  <img src={data.findCompanyById.image || 'assets/male.png'} alt="profile"/>
                </div>
                <span>{data.findCompanyById.name}</span>
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
                <div id="dropdown-list" onClick={_ => logout()}>
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