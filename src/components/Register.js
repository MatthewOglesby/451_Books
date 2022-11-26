import React, {useState} from 'react';
import { Navigate } from 'react-router-dom';
import { registerUser } from '../api';
import logo from '../Register.jpg'

const Register = ({setToken, token, navigate}) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(false);

    let loginForm = document.getElementById('loginForm')

    const handleSubmit = async() => {
        const results = await registerUser(email, username, password);
    
        if (password !== confirmPassword) {
            return null;
        }
    
        if (results.token) {
            setToken(results.token)
            console.log(results.message);
            window.localStorage.setItem('token', results.token);
            navigate('/');
        } else {
            console.log('Error registering an account')
            loginForm.style.animation = 'shake .5s'
            document.getElementsByName('email')[0].value = ''
            document.getElementsByName('username')[0].value = ''
            document.getElementsByName('password')[0].value = ''
            document.getElementsByName('confirmPassword')[0].value = ''
        }
    }

    return (
        <div className='allRegister'>
            <img src={logo} className='registerLogo'/>
        <div className='registerForm' id='loginForm'>
            <form className='registrationForm' onSubmit={(event) => {
                event.preventDefault();
                handleSubmit();
            }
            }>
                <div className='registerDiv'>
                    <label className='registerLabel'>Enter Email</label>
                    <input
                        className='userorpass'
                        name='email'
                        type='text'
                        autoFocus
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className='registerDiv'>
                    <label className='registerLabel'>Create Username</label>
                    <input
                        className='userorpass'
                        name='username'
                        type='text'
                        autoFocus
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className='registerDiv'>
                    <label className='registerLabel'>Create Password</label>
                    <input
                        className='userorpass'
                        name='password'
                        type='password'
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div className='registerDiv'>
                    <label className='registerLabel'>Confirm Password</label>
                    <input
                        className='userorpass'
                        name='confirmPassword'
                        type='password'
                        onChange={(event) => setConfirmPassword(event.target.value)}
                    />
                </div>
                <button className='submitRegister' type='submit'>Register</button>
                <p id='errorMessage'></p>
            </form>
        </div>
        </div>
    )
}

export default Register;