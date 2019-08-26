import React from 'react';
import './App.css';
import AppContext from '../contexts/AppContext';
import Router from './Router';

class App extends React.Component {
  render() {
    return (
      <AppContext.Controller>
        <div className="App">
          <div id="main">
            <Router />
          </div>
        </div>
      </AppContext.Controller>
    );
  }
}

export default App;
