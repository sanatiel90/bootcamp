import React, { Component } from 'react'
import Routes from './routes'
//Provider do react-redux: deverá ficar como wrapper principal do app, pois ele vai prover o acesso ao store do redux à todos os componentes
import { Provider } from 'react-redux'
import './config/reactotron'
import store from './store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routes/>
      </Provider>
    )
  }
}

export default App;
