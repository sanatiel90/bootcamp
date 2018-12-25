import React, { Component } from 'react';
import Main from './pages/Main'
import Map from './components/Map'

import { Provider } from 'react-redux'
import './config/reactotron'
import store from './store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Map/>
      </Provider>
    );
  }
}

export default App;
