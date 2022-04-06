import {INSERT_DATA, CLEAR_DATA} from "./action";

const initialState  = {
    data: null,
    token: null
}

const LogIn = (state = initialState, action) => {
    switch (action.type){
        case INSERT_DATA:
            return {
                ...state,
                data: action.payload.data,
                token: action.payload.token
            }
        case CLEAR_DATA:
            return {
                ...state,
                data: null,
                token: null
            }

        default: return state;
    }
}

export default LogIn;