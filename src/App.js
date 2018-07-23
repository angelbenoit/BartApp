import React, { Component } from 'react';
import LandingPage from './components/LandingPage';
import {BrowserRouter,Route} from 'react-router-dom';
import { connect } from 'react-redux';
//import * as actions from './actions';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
              <Route exact path='/' component={LandingPage} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
