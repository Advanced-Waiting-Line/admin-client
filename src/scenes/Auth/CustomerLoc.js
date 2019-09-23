import React from 'react';
import './customerLoc.css';
// import MapComp from './MapComp';
// import blueMuted from './MapTheme/blueMuted';
// import avocadoWorld from './MapTheme/avocadoWorld';

const fakeData = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    location: {
      latitude: -6.175110,
      longitude: 106.865036,
    },
  },
  {
    id: 2,
    firstName: 'User',
    lastName: 'Kampanye',
    location: {
      latitude: -6.175645,
      longitude: 106.827319,
    },
  },
  {
    id: 3,
    firstName: 'Albert',
    lastName: 'Griwok',
    location: {
      latitude: -6.219589,
      longitude: 106.812605,
    },
  },
];
const officeLoc = {
  lat: -6.260181,
  lng: 106.780505,
};

export default _ => {
  return (
    <div id="right-customer-loc">
      <div id="box-map">
        {/* <MapComp
          data={fakeData}
          officeLoc={officeLoc}
          mapTheme={blueMuted}
        /> */}
      </div>
    </div>
  )
}