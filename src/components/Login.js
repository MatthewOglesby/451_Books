import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { loginUser } from '../api';

const Login = ({ setToken, navigate }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = async () => {
        const results = await loginUser(username, password);
        console.log(results)
        if (results.token) {
            setToken(results.token)
            console.log('Successfully signed in');
            window.localStorage.setItem('token', results.token);
            navigate('/');
        } else {
            console.log('Error logging in')
            setError(true)
            document.getElementsByName('username')[0].value = ''
            document.getElementsByName('password')[0].value = ''
        }
    }

    return (
        <div className='loginAll'>
            <div className={error ? 'error' : 'loginForm'}>
                <form className='loggingInForm' autoComplete='off' onSubmit={(event) => {
                    event.preventDefault();
                    handleSubmit();
                    setError(false);
                }
                }>
                    <div className='loginDiv'>
                        <label className='loginLabel'>Username</label>
                        <input
                            className='userorpass'
                            name='username'
                            type='text'
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </div>
                    <div className='loginDiv'>
                        <label className='loginLabel'>Password</label>
                        <input
                            className='userorpass'
                            name='password'
                            type='password'
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <p className={error ? 'errorMessage' : 'hidden'}>Username or password is incorrect</p>
                    <button className='submitLogin' type='submit'>Login</button>
                    <p className={error ? 'errorMessage2' : 'hidden'}>New here? <Link to='/register' id='sign-in-msg'>Create an account</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login;