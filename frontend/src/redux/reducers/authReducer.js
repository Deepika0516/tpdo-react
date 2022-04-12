import ACTIONS from "../actions/index"

const initialState = {
    user: [],
    isLoggedIn: false
}


const authReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case ACTIONS.LOGIN:
            return {
                ...state,
                isLoggedIn: true
            }
            case ACTIONS.GET_USER:
                return {
                    ...state,
                    user: actions.payload.user
                }
            default:
                return state
    }
    
}

export default authReducer