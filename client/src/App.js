import React, { Fragment } from 'react';
import './App.css';

import Navigation from './components/Navigation';
import ListData from './components/ListData';

function App() {
  return (
    <Fragment>
      <div>
        <Navigation />
        <ListData />
      </div>
    </Fragment>
  );
}

export default App;
