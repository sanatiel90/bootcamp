//usando duck pattern: com esse padrao, as actions e reducers ficam no mesmo arquivo 

//obj com todas as types das actions
export const Types = {
    ADD_REQUEST: 'favorites/ADD_REQUEST',
    ADD_SUCCESS: 'favorites/ADD_SUCCESS',
    ADD_FAILURE: 'favorites/ADD_FAILURE',
}

///REDUCERS
const INITAL_STATE = {
    loading: false,
    error: null,
    data: []
}
//reducer
export default function favorites(state = INITAL_STATE, action){
    switch(action.type){
        //caso de action request o reducer tbm vai ouvir, apenas pra modifcar o state loading para true
        case Types.ADD_REQUEST:
            return { ...state,  loading: true }

        //caso de action success vai atualizar o state com a informacao q ja tinha (...state), loading false pois parou de carregar
        //e um array com os dados q vai adicionar 
        case Types.ADD_SUCCESS: 
            return { ...state,  loading: false, error: false, data: [...state.data, action.payload.data] }  
        
        case Types.ADD_FAILURE:    
            return { ...state, loading: false, error: action.payload.error }
        default:
            return state
    }

}

///ACTIONS: estarão presentes no obj Creators
//FLUXO DAS ACTIONS: o componente se comunica com o a action Request; action Resquest se comunica com o saga, 
//que faz a chamada à api e retorna o resultado à action Success, q por sua vez repassa esse resultado ao Reducer
//COMPONENTE -> ACTION_REQUEST -> SAGA -> CHAMADA API -> ACTION_SUCCESS -> REDUCER
export const Creators = {
    addFavoriteRequest: repository => ({
        type: Types.ADD_REQUEST,
        payload: { repository }
    }),
    
    addFavoriteSuccess: data => ({
        type: Types.ADD_SUCCESS,
        payload: { data }
    }),
    
    //ACTION PARA quando houver error
    addFavoriteFailure: error => ({
        type: Types.ADD_FAILURE,
        payload: { error }
    }),
}

