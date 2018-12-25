import { createStore, compose, applyMiddleware }  from 'redux'

import createSagaMiddleware from 'redux-saga'

//importando reducers e sagas
import reducers from './ducks'
import sagas from './sagas'

//array middlewares q vao ser aplicados ao store
const middlewares = []

const sagaMonitor = 
    process.env.NODE_ENV === 'development' ? console.tron.createSagaMonitor : null

const sagaMiddleware = createSagaMiddleware({ sagaMonitor })
middlewares.push(sagaMiddleware)

const createAppropriateStore =
    process.env.NODE_ENV === 'development' ? console.tron.createStore : createStore

//cria o store repassando os reducers e aplica os middlewares
const store = createAppropriateStore(reducers, compose(applyMiddleware(...middlewares)))

//rodando as sagas no middleware do saga
sagaMiddleware.run(sagas)

export default store



