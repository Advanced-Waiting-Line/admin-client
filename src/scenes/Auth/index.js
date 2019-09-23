import React, { useState, useEffect } from 'react';
import './style.css';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import ProblemList from './ProblemList';
import CustomerLoc from './CustomerLoc';

// <=========== Graphql ===========>
import { useQuery } from '@apollo/react-hooks';
import { STARTER_DASHBOARD } from '../../services/graphql/query';

export default _ => {
  const [activeMenu, setActiveMenu] = useState('Problem List');

  const { loading, error, data } = useQuery(STARTER_DASHBOARD, {
    variables: {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDg4NDY1NjAyZjY1NTExNmI1MTIzOWUiLCJlbWFpbCI6ImNvbXBhbnkxQG1haWwuY29tIiwiaWF0IjoxNTY5MjEzNTc4LCJleHAiOjE1Njk0Mjk1Nzh9.QZZ1gXJwziTFUCiTWMGKCn1Vkfy2fBgZ_n117g814jk",
      companyId: "5d88465602f655116b51239e"
    }
  });

  const pushNewProb = (newData) => {
    data.getCompanyProblem.push(newData);
  }

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
    <section id="dashboard">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>

      <div id="dashboard-body">
        <Navbar/>
        
        {activeMenu === 'Dashboard' &&
          <Dashboard data={[]} />
        }
        {activeMenu === 'Problem List' &&
          <ProblemList data={data.getCompanyProblem} pushNewProb={pushNewProb} />
        }
        {activeMenu === 'Customer Location' &&
          <CustomerLoc/>
        }
      </div>
    </section>
  )
}