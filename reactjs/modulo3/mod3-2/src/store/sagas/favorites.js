import { call, put, select } from 'redux-saga/effects'
import api from '../../services/api'

//importando actions de favorites para saga repassar resultado da api ao reducer
import { Creators as FavoriteActions } from '../ducks/favorites'

//essa funcao do saga basicamente vai, usando dados fornecidos pela action ADD_FAVORITE_REQUEST, fazer requisicao à api
//e retornar os dados na action  ADD_FAVORITE_SUCCESS

//funcao generator para fazer req assincrona mais performatica
//esta funcao do saga é chamada quando action ADD_FAVORITE_REQUEST for chamada, essa action é passada como param
export function* addFavorite(action){
    try {
        //req GET usando call() do saga; 1º param: func q deseja executar, sem parenteses; 2º param: parametros a serem passados para a func informada  
        const { data } =  yield call(api.get, `/repos/${action.payload.repository}`)

        //usa select do saga para verificar se repo já está salvo no estado, estando portanto duplicado
        const isDuplicated = yield select(state => state.favorites.data.find(favo => ( favo.id === data.id )))

        if (isDuplicated){
            yield put(FavoriteActions.addFavoriteFailure('Repositório duplicado'))    
        } else{
            //dados pegues da api
            const repositoryData = {
                id: data.id,
                name: data.full_name,
                desc: data.description,
                url: data.html_url,
            }
            //usando put() do saga para chamar a action addFavoriteSuccess, repassando a ela os dados vindos da api (repositoryData)
            //a action addFavoriteSuccess vai repassar tais dados ao reducer
            yield put(FavoriteActions.addFavoriteSuccess(repositoryData))
        }

    } catch (err) {
        //em caso de erro chamar a action de failure
        yield put(FavoriteActions.addFavoriteFailure('Error ao adicionar repositório'))
    }
}