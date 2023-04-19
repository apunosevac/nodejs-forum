import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [usernameReg, setUsername] = useState("");
    const [emailReg, setEmail] = useState("");
    const [passwordReg, setPassword] = useState("");

    return (
        <main className='register'>
            <h1 className='registerTitle'>Create an account</h1>
            <form className='registerForm' action="/registerUser" method="post">
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
                    type='text'
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
        </main>
    );
};

export default Register;