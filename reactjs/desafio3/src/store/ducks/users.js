//actions types
export const Types = {
    ADD_REQUEST: 'users/ADD_REQUEST',
    ADD_SUCCESS: 'users/ADD_SUCCESS',
    ADD_FAILURE: 'users/ADD_FAILURE'
}

const INITIAL_STATE = {
    data: [],
    error: null
}

//reducer
export default function users(state = INITIAL_STATE, action){
    switch(action.type){
        case Types.ADD_REQUEST: 
            return { ...state }

        case Types.ADD_SUCCESS:
            return { ...state, error: false, data: [...state.data, action.payload.data ] }

        case Types.ADD_FAILURE:
            return { ...state, error: action.payload.error }

        default:
            return state
    }

    
}

//actions
export const Creators = {
    addUserRequest: user => ({
        type: Types.ADD_REQUEST,
        payload: { user }
    }),

    addUserSuccess: data => ({
        type: Types.ADD_SUCCESS,
        payload: { data }
    }),

    addUserFailure: error => ({
        type: Types.ADD_FAILURE,
        payload: { error }
    })

}


