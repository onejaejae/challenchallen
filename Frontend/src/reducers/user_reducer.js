import {SET_USER_TEMP, LOGOUT} from "../actions/acitonTypes";

export default function (state={user:null, error: false}, action) {
    switch (action.type) {
        case SET_USER_TEMP:
            return{...state, user: action.payload}

        case LOGOUT:
            return {...state, user: null}
        default:
            return state;
    }
}