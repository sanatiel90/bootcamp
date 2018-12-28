import { call, put, select } from 'redux-saga/effects'

import api from '../../services/api'

import { Creators as UserActions } from '../ducks/users'

//saga q faz req à api para add um user
export function* addUser(action){
    try {
        const { data } = yield call(api.get, `/users/${action.payload.user.userInput}`)
        
        const userData = {
            id: data.id,
            name: data.name,
            avatar: data.avatar_url,
            repositories: data.public_repos, 
            url: data.html_url,
            latitude: action.payload.user.latitude,
            longitude: action.payload.user.longitude,
        }
        yield put(UserActions.addUserSuccess(userData))
        
    } catch (err) {
        yield put(UserActions.addUserFailure('Erro ao adicionar usuário!'))
    }
}

export function* deleteUser(action){
    try{
        yield put(UserActions.addUserSuccess(action.payload.id))

    } catch(err){
        yield put(UserActions.deleteUserFailure('Erro ao remover usuário!'))
    }
}