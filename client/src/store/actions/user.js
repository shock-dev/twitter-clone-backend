import { CLEAR_USER, SET_USER } from '../cases/user';
import axios from '../../core/axios';

export const fetchUserInfo = () => async (dispatch) => {
    try {
        const { data } = await axios.get('http://localhost:5000/users/me');
        dispatch(setUser(data));
    } catch (e) {
        console.log(e);
    }
};

export const logout = () => ({
    type: CLEAR_USER
});

export const setUser = (data) => ({
    type: SET_USER,
    payload: data
});
