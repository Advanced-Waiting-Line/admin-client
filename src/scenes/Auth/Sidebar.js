import React from 'react';
import { Home, List, Map } from 'react-feather';

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

export default ({ activeMenu, setActiveMenu }) => {

  return (
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
        {menus.map((el, i) => (
          el.text === activeMenu ?
          <div className="menu-body active" key={i} onClick={_ => setActiveMenu(el.text)}>
            {el.icon}
            <span>{el.text}</span>
          </div> :
          <div className="menu-body" key={i} onClick={_ => setActiveMenu(el.text)}>
            {el.icon}
            <span>{el.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}