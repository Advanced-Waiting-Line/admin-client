import React, { useState } from 'react';
import './style.css';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import ProblemList from './ProblemList';
import CustomerLoc from './CustomerLoc';

import { useQuery } from '@apollo/react-hooks';
import { GET_COMPANY_PROBLEM, GET_COMPANY_INFO } from '../../services/graphql/query';

// <=========== FIREBASE ===========>
import db from '../../services/api/firestore';

export default ({ setIsLogin }) => {

  const [activeMenu, setActiveMenu] = useState('Dashboard');

  const { loading: loadingFetchProblem, error: errorFetchProblem, data: dataFetchProblem, refetch: refetchProblem } = useQuery(GET_COMPANY_PROBLEM, {
    variables: {
      companyId: localStorage.getItem('ccid'),
    }
  });

  const { loading: loadingFetchCompany, error: errorFetchCompany, data: dataFetchCompany, refetch: refetchFetchCompany } = useQuery(GET_COMPANY_INFO, {
    variables: {
      companyId: localStorage.getItem('ccid'),
    }
  });

  if (!loadingFetchProblem && !loadingFetchCompany) {
    db.collection('awansub')
    .onSnapshot(_ => {
      refetchProblem();
      refetchFetchCompany();
      console.log('sub');
    });
  }

  return (
    <section id="dashboard">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>

      <div id="dashboard-body">
        <Navbar setIsLogin={setIsLogin}/>
        
        {activeMenu === 'Dashboard' &&
          <Dashboard loading={loadingFetchCompany} error={errorFetchCompany} data={dataFetchCompany} />
        }
        {activeMenu === 'Problem List' &&
          <ProblemList loading={loadingFetchProblem} error={errorFetchProblem} data={dataFetchProblem} />
        }
        {activeMenu === 'Customer Location' &&
          <CustomerLoc data={dataFetchCompany} />
        }
      </div>
    </section>
  )
}