import React from 'react';
import './customerLoc.css';
import MapComp from './MapComp';
import blueMuted from './MapTheme/blueMuted';
// import avocadoWorld from './MapTheme/avocadoWorld';
import client from '../../services/graphql/';
import { GET_COMPANY_INFO } from '../../services/graphql/query';

export default _ => {
  const data = client.readQuery({ 
    query: GET_COMPANY_INFO,
    variables: {
      companyId: localStorage.getItem('ccid'),
    }
  });
  
  console.log(data)

  return (
    <div id="right-customer-loc">
      <div id="box-map">
        <MapComp
          data={data.findCompanyById.queue}
          // data={[]}
          officeLoc={data.findCompanyById.location}
          mapTheme={blueMuted}
        />
      </div>
    </div>
  )
}