import React, {useState} from 'react';
import { Navigate } from 'react-router-dom';
import { registerUser } from '../api';

const Register = ({setToken, token, navigate}) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // let loginForm = document.getElementById('loginForm')
    // let errorMessage = document.getElementById('errorMessage')

    const handleSubmit = async() => {
        const results = await registerUser(email, username, password);
    
        if (password !== confirmPassword) {
            return null;
        }
    
        if (results.token) {
            setToken(results.token)
            console.log(results.message);
            window.localStorage.setItem('token', results.token);
            navigate('/home');
        } else {
            console.log('Error registering an account')
            // loginForm.style.animation = 'shake .5s'
            // document.getElementsByName('username')[0].value = ''
            // document.getElementsByName('password')[0].value = ''
            // document.getElementsByName('confirmPassword')[0].value = ''
        }
    }

    return (
        <div className='loginForm' id='loginForm'>
            <form className='registerForm' onSubmit={(event) => {
                event.preventDefault();
                handleSubmit();
            }
            }>
                <div className='inputDiv'>
                    <label className='inputLabel'>Enter Email</label>
                    <input
                        className='userorpass'
                        name='email'
                        type='text'
                        autoFocus
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className='inputDiv'>
                    <label className='inputLabel'>Create Username</label>
                    <input
                        className='userorpass'
                        name='username'
                        type='text'
                        autoFocus
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className='inputDiv'>
                    <label className='inputLabel'>Create Password</label>
                    <input
                        className='userorpass'
                        name='password'
                        type='password'
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div className='inputDiv'>
                    <label className='inputLabel'>Confirm Password</label>
                    <input
                        className='userorpass'
                        name='confirmPassword'
                        type='password'
                        onChange={(event) => setConfirmPassword(event.target.value)}
                    />
                </div>
                <button className='submit' type='submit'>Register</button>
                <p id='errorMessage'></p>
            </form>
        </div>
    )
}

export default Register;