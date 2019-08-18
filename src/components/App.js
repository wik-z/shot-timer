import React from 'react';
import './App.css';
import AppContext from '../contexts/AppContext';
import Router from './Router';

/**
 * To-do notes
 * Threshold-only approach is not enough to ensure correct values
 * there still is a high probability it will take a completely different sound as a sample
 * Threshold + spectrum comparison is a much better approach
 */
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
