import React, { useState } from 'react';
import { register } from '../Api/advertiserService';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setAdvertiser } from '../Redux/AdvertiserSlice';


export const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [additionalPhone, setAdditionalPhone] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '', phone: '', additionalPhone: '' });
    const [resError, setResError] = useState('')
    const [open, setOpen] = useState(false);

    const dis = useDispatch()
    const nav = useNavigate()


    const clearErrors = () => {
        setErrors({ email: '', password: '', phone: '', additionalPhone: '' });
    };

    const validateForm = async (event) => {
        event.preventDefault();
        clearErrors();

        let isValid = true;
        const newErrors = { email: '', password: '', phone: '', additionalPhone: '' };

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

        // Validate phone 
        const phonePattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
        if (phone == '') {
            newErrors.phone = 'חובה להכניס טלפון';
            isValid = false;
        }
        else if (!phonePattern.test(phone)) {
            newErrors.phone = 'טלפון לא תקין'
            isValid = false
        }

        if (additionalPhone != '') {
            if (!phonePattern.test(additionalPhone)) {
                newErrors.additionalPhone = 'טלפון לא תקין'
                isValid = false
            }
        }

        setErrors(newErrors);

        console.log(isValid)
        if (isValid) {
            await register(name, email, password, phone, additionalPhone)
                .then(res => {
                    console.log(res.data)
                    localStorage.setItem("token", res.data.token)
                    dis(setAdvertiser(res.data.advertiser))
                    nav('/')
                })
                .catch(err => {
                    if(err.response.data.error)
                    {
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

        <div className="container-login">
            <div className="login-box">
                <img className='logo' src={`${process.env.PUBLIC_URL}/images/logo.png`} onClick={()=>{nav('/')}}></img>
                <h2>הרשמה</h2>
                <form id="login-form" onSubmit={validateForm}>

                    <div className="input-group">
                        <b htmlFor="name">שם</b>
                        <input
                            id="name"
                            placeholder="הכנס את השם שלך"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

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

                    <div className="input-group">
                        <b htmlFor="phone">טלפון  </b>
                        <input
                            id="phone"
                            placeholder="הכנס את הטלפון שלך"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <small id="phone-error" className="error-message">{errors.phone}</small>
                    </div>

                    {/* טלפון נוסף - פחות יפה בתצוגה כי הטופס נהיה יותר ארוך מהמסך... */}
                    {/* <div className="input-group">
                        <b htmlFor="addphone">טלפון נוסף  </b>
                        <input
                            id="addphone"
                            placeholder="אפשר להכניס טלפון נוסף"
                            value={additionalPhone}
                            onChange={(e) => setAdditionalPhone(e.target.value)}
                        />
                        <small id="addphone-error" className="error-message">{errors.additionalPhone}</small>
                    </div> */}

                    <button type="submit" className="submit-btn">הירשם</button>

                    {/* <div className="forgot-password">
                        <a href="#">Forgot Password?</a>
                    </div> */}
                </form>

                <label className="signup-link">כבר יש לך חשבון? <Link to={'../login'}>התחבר כאן </Link></label>

            </div>
        </div>
    </div>
};


