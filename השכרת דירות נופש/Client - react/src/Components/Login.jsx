import React, { useEffect, useState } from 'react';
import { login } from '../Api/advertiserService';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setAdvertiser } from '../Redux/AdvertiserSlice';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [resError, setResError] = useState('')
    const [open, setOpen] = useState(false);

    const dis = useDispatch()
    const nav = useNavigate()


    const clearErrors = () => {
        setErrors({ email: '', password: '' });
    };

    const validateForm = async (event) => {
        event.preventDefault();
        clearErrors();

        let isValid = true;
        const newErrors = { email: '', password: '' };

        // Validate email
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (email == '') {
            newErrors.email = 'חובה להכניס מייל';
            isValid = false;
        }
        else if (!emailPattern.test(email)) {
            newErrors.email = 'מייל לא תקין';
            isValid = false;
        }

        // Validate password
        if (password == '') {
            newErrors.password = 'חובה להכניס סיסמה';
            isValid = false;
        }

        setErrors(newErrors);

        if (isValid) {
            await login(email, password)
                .then(res => {
                    console.log(res.data)
                    localStorage.setItem("token", res.data.token)
                    dis(setAdvertiser(res.data.advertiser))
                    nav('/')
                })
                .catch(err => {
                    if (err.response.data.error) {
                        console.log("error: ", err.response.data)
                        setResError(err.response.data.error)
                        setOpen(true)
                        setTimeout(() => {
                            setOpen(false)
                            setResError('')
                        }, 5000);
                    }

                })
        }
    };

    return <div>
        <Snackbar
            open={open}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={6000}
        >
            <Alert
                severity="error"
                variant="filled"
                sx={{ width: '100%' }}
            >
                {resError}
            </Alert>
        </Snackbar>

        <div className="container-login login">
            <div className="login-box">
                <img className='logo' src={`${process.env.PUBLIC_URL}/images/logo.png`} onClick={()=>{nav('/')}} ></img>
                <h2>התחברות</h2>
                <form id="login-form" onSubmit={validateForm}>
                    <div className="input-group">
                        <b htmlFor="email">מייל  </b>
                        <input
                            id="email"
                            placeholder="הכנס את המייל שלך"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <small id="email-error" className="error-message">{errors.email}</small>
                    </div>

                    <div className="input-group">
                        <b htmlFor="password">סיסמה  </b>
                        <input
                            type="password"
                            id="password"
                            placeholder="הכנס את הסיסמה שלך"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <small id="password-error" className="error-message">{errors.password}</small>
                    </div>

                    <button type="submit" className="submit-btn">התחבר</button>

                    {/* <div className="forgot-password">
                        <a href="#">Forgot Password?</a>
                    </div> */}
                </form>

                <label className="signup-link">עוד אין לך חשבון? <Link to={'../register'}>הירשם כאן </Link></label>

            </div>
        </div>
    </div>
};


