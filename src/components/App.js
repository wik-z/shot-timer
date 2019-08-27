import React from 'react';
import './App.css';
import Router from './Router';
import AppContext from '../contexts/AppContext';

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
