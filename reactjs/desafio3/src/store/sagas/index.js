import { all, takeLatest } from 'redux-saga/effects'

import { Types as UserTypes } from '../ducks/users'

import { addUser } from './users'

export default function* rootSaga(){
    yield all([
        //quando for chamada uma action ADD_REQUEST de user, chamar o a func addUser criada no saga
        takeLatest(UserTypes.ADD_REQUEST, addUser)
    ])
}

