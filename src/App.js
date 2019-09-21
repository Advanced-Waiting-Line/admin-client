import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Awan from './scenes/';

function App() {
  return (
    <Router>
      <Route path="/" component={Awan}/>
    </Router>
  );
}

export default App;
