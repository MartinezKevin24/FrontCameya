import {OPTION_CLIENT, OPTION_WORKER} from "./action";

const roleState  = {
    role: "Contratante"
}

const SingUp = (state = roleState, action) => {
    switch (action.type){
        case OPTION_CLIENT:
            return {
                ...state,
                role: action.payload
            }
        case OPTION_WORKER:
            return {
                ...state,
                role: action.payload
            }
        default: return state;
    }
}

export default SingUp;