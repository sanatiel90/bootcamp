import React, { Component } from 'react';
import Map from './components/Map'
import GlobalStyle from './styles/global'
import { Provider } from 'react-redux'
import './config/reactotron'
import store from './store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <GlobalStyle/>
        <Map/>
      </Provider>
    );
  }
}

export default App;
