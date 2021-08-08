import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth } from './firebase';
import "./Login.css"
function Login() {
    const history = useHistory();
    const [email,setEmail] =  useState('');
    const [password,setPassword] =  useState('');
    const signin = e =>{
         e.preventDefault();  
         //Firebase Signin Settings
         auth.signInWithEmailAndPassword(email,password)
         .then(auth =>{
             history.push('/')
         })
         .catch(error => alert(error.message))
    }

    const register = e =>{
        e.preventDefault();
        //Firebase Register Settings
        auth.createUserWithEmailAndPassword(email,password)
        .then((auth) => {
            if(auth){
                history.push('/');
            }
        })
        .catch(error => alert(error.message))
    }
    return (
        <div className="login">
            
            <Link to="/">
            <img
            className="login__logo"
            alt = "Company Logo"
            src='https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg'/>
            </Link>
            <div class="login__container">
                <h1>Sign-in</h1>
                <form>
                    <h5>E-mail</h5>
                    <input type = 'text' value={email} onChange={e=> setEmail(e.target.value)}/>
                    <h5> Password</h5>
                    <input type ='password' value={password} onChange={e => setPassword(e.target.value)}/>
                    <button type='submit' onClick={signin}
                     className="login__signinButton">
                          Sign In</button>
                </form>
                <p>
                    By Signing-in you agree to Anurag's conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest Based Ads
                </p>
                <h7 className="login__noaccount">Do not have an account</h7>
                <button  onClick={register}
                 className="login__registerButton">
                     Create your Account</button>
            </div>
        </div>
    )
}

export default Login
