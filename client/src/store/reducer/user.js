import { CLEAR_USER, SET_USER } from '../cases/user';

const initialState = {
    info: null
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                info: action.payload
            };
        case CLEAR_USER:
            return {
                ...state,
                info: null
            };
        default:
            return state;
    }
};

export default user;
