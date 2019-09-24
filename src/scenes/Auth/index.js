import React, { useState } from 'react';
import './style.css';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import ProblemList from './ProblemList';
import CustomerLoc from './CustomerLoc';

export default _ => {
  const [activeMenu, setActiveMenu] = useState('Dashboard');

  return (
    <section id="dashboard">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>

      <div id="dashboard-body">
        <Navbar/>
        
        {activeMenu === 'Dashboard' &&
          <Dashboard/>
        }
        {activeMenu === 'Problem List' &&
          <ProblemList/>
        }
        {activeMenu === 'Customer Location' &&
          <CustomerLoc/>
        }
      </div>
    </section>
  )
}