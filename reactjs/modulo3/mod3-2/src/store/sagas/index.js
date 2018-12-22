///no redux, um middleware é uma camada que atua entre a ACTION e o REDUCER; o middleware pode por exemplo ser usado para,
//depois q action for chamada, fazer uma requisicao à um api, e entao passar esse resultado para o reducer
//REDUX-SAGA é uma lib q faz esse middleware entre action e reducer

//all: comp do saga que serve para juntar todas as sagas(middlewares); funciona como combineReducers pra reducers 
//takeLatest: caso haja mais de uma req sendo feita ao msm tempo, vai pegar apenas o resultado a ultima req q carregar
//takeEvery: caso haja mais de uma req sendo feita ao msm tempo, aguarda e pega os results de todas
import { all, takeLatest } from 'redux-saga/effects'

//importando TYpes de actions
import { Types as FavoriteTypes } from '../ducks/favorites'
//importado saga addFavorite
import { addFavorite } from './favorites'

//function*: sintaxe indicando q a funcao é um generator, uma funcao assincrona com alto desempenho (funciona como se fosse o async)
export default function* rootSaga(){
    //yield: funciona como se fosse o await
    yield all([
        //takeLatest: 1º param: nome do action_type q será chamado; 2º param: qual func vai ser chamada
        //nesse caso quando for a action ADD_FAVORITE_REQUEST, será chamado a func addFavorite do saga)
        takeLatest(FavoriteTypes.ADD_REQUEST, addFavorite) 
    ])
}