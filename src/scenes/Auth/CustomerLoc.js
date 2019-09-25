import React, { useState } from 'react';
import './customerLoc.css';
import MapComp from './MapComp';
import blueMuted from './MapTheme/blueMuted';
import avocadoWorld from './MapTheme/avocadoWorld';

export default ({ data }) => {

  const [theme, setTheme] = useState(blueMuted);
  
  console.log(data);

  return (
    <div id="right-customer-loc">
      <div id="box-theme-btn">
        <button onClick={_ => setTheme(blueMuted)}>Bluemuted</button>
        <button onClick={_ => setTheme(avocadoWorld)}>Avocado</button>
      </div>
      <div id="box-map">
        <MapComp
          data={data.findCompanyById.queue}
          officeLoc={data.findCompanyById.location}
          mapTheme={theme}
        />
      </div>
    </div>
  )
}