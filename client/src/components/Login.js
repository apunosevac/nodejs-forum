import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ email, password });
        loginUser();
        setEmail("");
        setPassword("");
    };


    const loginUser = () => {
        Axios.post("http://localhost:8080/api/login", {
            email: email,
            pass: password,
        }).then((response) => {
            navigate('home')
        }).catch((error) =>{
            alert('Error while logging in!');
        });
    };


    return (
        <main className='login'>
            <h1 className='loginTitle'>Log into your account</h1>
            <form className='loginForm' action="/login" method="POST" onSubmit={handleSubmit}>
                <label htmlFor='email'>Email Address</label>
                <input
                    type='text'
                    name='email'
                    id='email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='loginBtn'>SIGN IN</button>
                <p>
                    Don't have an account? <Link to='/register'>Create one</Link>
                </p>
            </form>
        </main>
    );
};
export default Login;