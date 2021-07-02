import React, { useState } from 'react'
import { auth, provider } from '../../firebase'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
// import styled from 'styled-components'
// import Btn from '@material-ui/core/Button'
// import { Checkbox, Input } from '@material-ui/core'
import './Login.scss'
import { CSSTransition } from 'react-transition-group'
import { FaFacebook, FaGoogle, FaTwitter, FaGithub } from 'react-icons/fa'

const Login = (props) => {
    const [option, setOption] = useState('signIn') // signIn || signUp || forgot
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [passwordConfirm, setPasswordConfirm] = useState()

    const resetInputFields = () => {
        setEmail('')
        setPassword('')
        setPasswordConfirm('')
        setFirstName('')
        setLastName('')
    }

    const providerSignIn = async (providerName) => {
        try {
            const data = await auth.signInWithPopup(provider[[providerName]])
            props.onSetUser(data.user)
        } catch (error) {
            var errorCode = error.code
            var errorMessage = error.message
            console.log(errorMessage)
        }
    }
    const passwordSignIn = async (event) => {
        event.preventDefault()
        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password)
            var user = userCredential.user
            console.log(user)
            props.onSetUser(user)
            setEmail('')
            setPassword('')
        } catch (error) {
            var errorCode = error.code
            var errorMessage = error.message
            console.log(errorMessage)
        }
    }
    const passwordRegister = async (event) => {
        event.preventDefault()
        try {
            const userCredential = await auth.createUserWithEmailAndPassword(email, password)
            var user = userCredential.user
            await user.updateProfile({
                firstName: firstName.trim(),
                lastName: lastName.trim(),
            })
            console.log(user)
            props.onSetUser(user)
            setEmail()
            setPassword()
            setFirstName()
            setLastName()
        } catch (error) {
            var errorCode = error.code
            var errorMessage = error.message
            console.log(errorMessage)
        }
    }

    return (
        <div className="form-background">
            <div className={`box ${option === 'signUp' && 'signup-box'}`}>
                <div className="sign-options-wrapper">
                    <div
                        className={`sign-option ${option === 'signIn' && 'sign-option-active'}`}
                        onClick={() => {
                            setOption('signIn')
                            resetInputFields()
                        }}
                    >
                        Sign In
                    </div>
                    <div
                        className={`sign-option ${option === 'signUp' && 'sign-option-active'}`}
                        onClick={() => {
                            setOption('signUp')
                            resetInputFields()
                        }}
                    >
                        Sign Up
                    </div>
                </div>
                <form className="form">
                    <CSSTransition appear={true} in={option === 'forgot'} timeout={{ enter: 500, exit: 0 }} classNames="signup-input" unmountOnExit>
                        <div className="password-forgot">
                            <h4>FORGOT YOUR PASSWORD?</h4>
                            <p>Please enter your email or mobile number to reset your password.</p>
                        </div>
                    </CSSTransition>
                    <CSSTransition appear={true} in={option === 'signUp'} timeout={300} classNames="signup-input" unmountOnExit>
                        <div>
                            <label for="first-name">First name</label>
                            <input value={firstName} id="first-name" onChange={(event) => setFirstName(event.target.value)}></input>
                        </div>
                    </CSSTransition>
                    <CSSTransition appear={true} in={option === 'signUp'} timeout={400} classNames="signup-input" unmountOnExit>
                        <div>
                            <label for="last-name">Last name</label>
                            <input value={lastName} id="last-name" onChange={(event) => setLastName(event.target.value)}></input>
                        </div>
                    </CSSTransition>
                    <label for="email">Email</label>
                    <input value={email} id="email" onChange={(event) => setEmail(event.target.value)}></input>
                    <CSSTransition
                        appear={true}
                        in={option !== 'forgot'}
                        timeout={{
                            enter: 100,
                            exit: 0,
                        }}
                        classNames="animate"
                        unmountOnExit
                    >
                        <div>
                            <div style={{ display: 'flex' }}>
                                <label style={{ flex: '1' }} for="password">
                                    Password
                                </label>
                                {option === 'signIn' && (
                                    <div className="forgot-password" onClick={() => setOption('forgot')}>
                                        Forgot your password?
                                    </div>
                                )}
                            </div>
                            <input value={password} id="password" type="password" onChange={(event) => setPassword(event.target.value)}></input>
                        </div>
                    </CSSTransition>
                    <CSSTransition
                        appear={true}
                        in={option === 'signUp'}
                        timeout={{
                            enter: 500,
                            exit: 300,
                        }}
                        classNames="signup-input"
                        unmountOnExit
                    >
                        <div>
                            <label for="password-confirm">Confirm password</label>
                            <input
                                type="password"
                                value={passwordConfirm}
                                id="password-confirm"
                                onChange={(event) => setPasswordConfirm(event.target.value)}
                            ></input>
                            <div className="button-container">
                                <button>Sign Up</button>
                            </div>
                        </div>
                    </CSSTransition>
                    <CSSTransition in={option === 'signIn' || option === 'forgot'} timeout={300} classNames="animate" unmountOnExit>
                        <div className="button-container">
                            <button
                                className={option === 'forgot' && 'forgot-password-button'}
                                onClick={(event) => {
                                    switch (option) {
                                        case 'signIn':
                                            console.log('SignIn')
                                            passwordSignIn(event)
                                            break
                                        case 'signUp':
                                            passwordRegister(event)
                                            break
                                    }
                                }}
                            >
                                {option === 'signIn' ? 'Sign In' : 'Reset your password'}
                            </button>
                        </div>
                    </CSSTransition>
                </form>
                <CSSTransition
                    appear={true}
                    in={option === 'signIn' || option === 'signUp'}
                    timeout={{
                        enter: 500,
                        exit: 300,
                    }}
                    classNames="animate"
                    unmountOnExit
                >
                    <div>
                        <div className="line" />
                        <div className="login-providers-wrapper">
                            <p className="login-with-text">{`Or ${option === 'signIn' ? 'Login' : 'Sign Up'} With`}</p>
                            <div className="login-providers">
                                <FaFacebook className="loginProvider" size="1.5em" color="#151e3f" onClick={() => providerSignIn('facebook')} />
                                <FaGoogle className="loginProvider" size="1.5em" color="#151e3f" onClick={() => providerSignIn('google')} />
                                <FaGithub className="loginProvider" size="1.5em" color="#151e3f" onClick={() => providerSignIn('gitHub')} />
                            </div>
                        </div>
                    </div>
                </CSSTransition>
            </div>
        </div>
    )
}

const mapDispathToProps = (dispatch) => {
    return {
        onSetUser: (user) => dispatch(actions.setUser(user)),
    }
}

export default connect(null, mapDispathToProps)(Login)

// const LoginWrapper = styled.div`
//     background-color: #f8f8f8;
//     height: 100vh;
//     width: 100vw;
//     display: grid;
//     place-items: center;
// `
// const LoginBox = styled.div`
//     width: 25vw;
//     height: 70vh;
//     display: flex;
//     flex-direction: column;
//     text-align: center;
//     background-color: white;
//     border-radius: 10px;
//     box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07), 0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
//         0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
// `
// const WhatsAppImage = styled.img`
//     object-fit: contain;
//     height: 110px;
//     margin-top: 5vh;
// `
// const LoginOptions = styled.div`
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
// `
// const LoginForm = styled.form`
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     margin-top: 1vh;
//     position: relative;
//     align-items: center;
//     overflow: hidden;
//     transition: all 2s ease;
// `
// const InputField = styled.input`
//     padding: 5px;
//     margin: 5px;
// `
// const Button = styled(Btn)`
//     // color: white !importent;
//     // width: 200px;
//     // margin-top: 50px !important;
//     // text-transform: inherit !important;
//     // background-color: #0a8d48 !important;
// `
// const GoogleSign = styled(Btn)``

// const RememberMeWrapper = styled.div`
//     display: flex;
//     justify-content: flex-start;
//     align-items: center;
// `
// const CreateNewAccount = styled.p`
//     font-size: 0.8rem;
//     background-color: blue;
// `
// const Link = styled.a``
// const Text = styled.p`
//     margin: 0px;
// `
