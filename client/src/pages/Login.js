import React, { useState } from 'react';
import axios from '../core/axios';

const formSchema = {
    username: '',
    password: ''
};

const Login = () => {
    const [formData, setFormData] = useState(formSchema);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/auth/signin', formData);
            localStorage.setItem('token', data.data.token);
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
