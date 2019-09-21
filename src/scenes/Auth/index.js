import React, { useState } from 'react';
import { Home, List, Map, Settings, Bell, ChevronDown, User, LogOut} from 'react-feather';
import './style.css';
import Dashboard from './Dashboard';
import ProblemList from './ProblemList';

export default _ => {
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [dropdown, setDropdown] = useState(false);

  const menus = [
    {
      icon: <Home size="19" />,
      text: 'Dashboard',
    }, {
      icon: <List size="19" />,
      text: 'Problem List',
    }, {
      icon: <Map size="17" />,
      text: 'Customer Location',
    }
  ];

  return (
    <section id="dashboard">
      <div id="sidebar">
        <div id="sidebar-header">
          <div id="sidebar-header-box-img">
            <img src="assets/cloud-blue.png" alt="logo-blue"/>
          </div>
          <h2>Hacktivate</h2>
        </div>
        <div id="menu">
          <div className="menu-header">
            <span>Main Menu</span>
          </div>
          {menus.map(el => (
            el.text === activeMenu ?
            <div className="menu-body active" onClick={_ => setActiveMenu(el.text)}>
              {el.icon}
              <span>{el.text}</span>
            </div> :
            <div className="menu-body" onClick={_ => setActiveMenu(el.text)}>
              {el.icon}
              <span>{el.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div id="dashboard-body">
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
        {activeMenu === 'Dashboard' &&
          <Dashboard/>
        }
        {activeMenu === 'Problem List' &&
          <ProblemList/>
        }
      </div>
    </section>
  )
}