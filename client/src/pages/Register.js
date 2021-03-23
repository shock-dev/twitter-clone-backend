import React, { useState } from 'react';
import axios from 'axios';

const formSchema = {
    email: '',
    username: '',
    fullname: '',
    password: '',
    password_confirm: ''
};

const Register = () => {
    const [formData, setFormData] = useState(formSchema);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/auth/signup', formData);
            console.log(data);
        } catch (e) {
            console.log(e.response.data.message);
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
            <h1>Registration</h1>
            <br/>
            <div>
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    onInput={inputHandler}
                />
            </div>

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
                    type="text"
                    placeholder="Fullname"
                    name="fullname"
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

            <div>
                <input
                    type="password"
                    placeholder="Confirm password"
                    name="password_confirm"
                    onInput={inputHandler}
                />
            </div>

            <button type="submit">
                Register
            </button>
        </form>
    );
};

export default Register;
