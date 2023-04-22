import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

const Register = () => {
    const [usernameReg, setUsername] = useState("");
    const [emailReg, setEmail] = useState("");
    const [passwordReg, setPassword] = useState("");
    const navigate = useNavigate();
    var dateCreated = new Date().toISOString().split('T')[0];
    var dateOnline = dateCreated;

    const handleSubmit = (e) => {
        e.preventDefault();
        registerUser();
        setEmail("");
        setUsername("");
        setPassword("");
    };

    const registerUser = () => {
        Axios.post("http://localhost:8080/api/registerUser", {
            username: usernameReg,
            email: emailReg,
            pass: passwordReg,
            date_created: dateCreated,
            date_online: dateOnline
        }).then((response) => {
            navigate('/home');
        }) .catch((error) => console.log(error));
    };

    return (
        <main className='register'>
            <h1 className='registerTitle'>Create an account</h1>
            <form className='registerForm' action="/registerUser" method="post" onSubmit={handleSubmit}>
                <label htmlFor='username'>Username</label>
                <input
                    type='text'
                    name='username'
                    id='username'
                    required
                    value={usernameReg}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor='email'>Email Address</label>
                <input
                    type='email'
                    name='email'
                    id='email'
                    required
                    value={emailReg}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    required
                    value={passwordReg}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='registerBtn'>REGISTER</button>
                <p>
                    Have an account? <Link to='/'>Sign in</Link>
                </p>
            </form>
            <h2 className="registerStatus">.</h2>
        </main>
    );
};

export default Register;