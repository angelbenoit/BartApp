import React, { Component } from 'react';
import LandingPage from './components/LandingPage';
import SearchPage from './components/SearchPage';
import {BrowserRouter,Route} from 'react-router-dom';
import { connect } from 'react-redux';
//import * as actions from './actions';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
              <Route exact path='/' component={LandingPage} />
              <Route exact path='/search' component={SearchPage} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
