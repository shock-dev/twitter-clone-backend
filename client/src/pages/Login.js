import React, { useState } from 'react';
import axios from '../core/axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/actions/user';
import { useHistory } from 'react-router-dom';

const formSchema = {
    username: '',
    password: ''
};

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [formData, setFormData] = useState(formSchema);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/auth/signin', formData);
            const { user, token } = data.data;
            localStorage.setItem('token', token);
            dispatch(setUser(user));
            history.push('/');
        } catch (e) {
            console.log(e.response);
        }
    };

    const inputHandler = (e) => {
        setFormData(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <form onSubmit={submitHandler}>
            <h1>Login</h1>
            <br/>
            <div>
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    onInput={inputHandler}
                />
            </div>

            <div>
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onInput={inputHandler}
                />
            </div>

            <button type="submit">
                Login
            </button>
        </form>
    );
};

export default Login;
