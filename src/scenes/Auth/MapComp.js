import React, { useState } from 'react';
import {GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';

export default ({ mapTheme, data, officeLoc }) => {
  
  const Map = _ => {
    const [selected, setSelected] = useState(null);
  
    return (
      <GoogleMap
        zoom={11}
        center={{ lat: -6.191209, lng: 106.827195 }}
        options={{ styles: mapTheme }}
      >
        <Marker 
          position={officeLoc}
          icon={{ url: `assets/loc-sm.png` }}
          onClick={_ => setSelected({firstName: 'Hacktivate'})}
        />
        {data.map((el, i) => (
          <Marker
            key={el.id}
            position={{
              lat: el.location.latitude,
              lng: el.location.longitude,
            }}
            icon={{ url: `assets/markers/marker_red${i+1}.png` }}
            onClick={_ => setSelected(el)}
          />
        ))}
        {selected && 
          <InfoWindow
            position={{
              lat: selected.location.latitude,
              lng: selected.location.longitude,
            }}
            onCloseClick={_ => setSelected(null)}
          >
            <h1>
            {selected.firstName}
            </h1>
          </InfoWindow>
        }
      </GoogleMap>
    )
  }

  const MapComp = withScriptjs(withGoogleMap(Map));

  return (
    <MapComp
      mapTheme={mapTheme}
      isMarkerShown
      googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
        process.env.REACT_APP_GOOGLE_KEY
      }`}
      loadingElement={<div style={{ height: `50vh` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  )
}