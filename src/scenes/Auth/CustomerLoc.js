import React from 'react';
import './customerLoc.css';
import MapComp from './MapComp';
import blueMuted from './MapTheme/blueMuted';
import avocadoWorld from './MapTheme/avocadoWorld';
import client from '../../services/graphql/';
import { GET_COMPANY_INFO } from '../../services/graphql/query';

export default _ => {
  const data = client.readQuery({ 
    query: GET_COMPANY_INFO,
    variables: {
      companyId: localStorage.getItem('ccid'),
    }
  });
  
  return (
    <div id="right-customer-loc">
      <div id="box-theme-btn">
        <button>Avocado</button>
      </div>
      <div id="box-map">
        <MapComp
          data={data.findCompanyById.queue}
          officeLoc={data.findCompanyById.location}
          mapTheme={blueMuted}
        />
      </div>
    </div>
  )
}