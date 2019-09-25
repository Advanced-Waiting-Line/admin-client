import React, { useState } from 'react';
import './style.css';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import ProblemList from './ProblemList';
import CustomerLoc from './CustomerLoc';

import { useQuery } from '@apollo/react-hooks';
import { GET_COMPANY_PROBLEM, GET_COMPANY_INFO, GET_DAILY_PERCENTAGE, GET_WEEKLY_PERCENTAGE } from '../../services/graphql/query';

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

  const { loading: loadingDaily, error: errorDaily, data: dataDaily, refetch: refetchDaily } = useQuery(GET_DAILY_PERCENTAGE, {
    variables: {
      token: localStorage.getItem('token'),
    }
  });

  const { loading: loadingWeekly, error: errorWeekly, data: dataWeekly, refetch: refetchWeekly } = useQuery(GET_WEEKLY_PERCENTAGE, {
    variables: {
      token: localStorage.getItem('token'),
    }
  });

  const refectAll = _ => {
    db.collection('awansub')
    .onSnapshot(_ => {
      refetchFetchCompany();
      refetchProblem();
      refetchDaily();
      refetchWeekly();
      console.log('subscribe');
    });
  }

  return (
    <section id="dashboard">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>

      <div id="dashboard-body">
        <Navbar
          setIsLogin={setIsLogin}
          loading={loadingFetchCompany}
          data={dataFetchCompany}
        />
        
        {activeMenu === 'Dashboard' &&
          <Dashboard
            refetch={refectAll}
            data={dataFetchCompany || []}
            loading={loadingFetchCompany}
            error={errorFetchCompany}
            dataDaily={dataDaily || []}
            loadingDaily={loadingDaily}
            errorDaily={errorDaily}
            dataWeekly={dataWeekly || []}
            loadingWeekly={loadingWeekly}
            errorWeekly={errorWeekly}
          />
        }
        {activeMenu === 'Problem List' &&
          <ProblemList
            loading={loadingFetchProblem}
            error={errorFetchProblem}
            data={dataFetchProblem || []}
            refetch={refectAll}
          />
        }
        {activeMenu === 'Customer Location' &&
          <CustomerLoc data={dataFetchCompany} />
        }
      </div>
    </section>
  )
}