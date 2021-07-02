import React, { useState } from 'react'
import styled from 'styled-components'
import Btn from '@material-ui/core/Button'
import { auth, provider } from '../../firebase'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import { Checkbox, Input } from '@material-ui/core'

const Login = (props) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [signUpForm, setSignUpForm] = useState(false)

  const googleSignIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        props.onSetUser(null)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }
  const passwordSignIn = async (event) => {
    event.persist()
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
    event.preventDefault()
  }
  const passwordRegister = async (event) => {
    event.persist()
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
    event.preventDefault()
  }

  return (
    <LoginWrapper>
      <LoginBox>
        <WhatsAppImage src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/598px-WhatsApp.svg.png' alt='' />
        <CreateNewAccount onClick={() => setSignUpForm(!signUpForm)}>Create New Account</CreateNewAccount>
        <LoginForm>
          <InputField type='text' placeholder='Email' value={email} onChange={(event) => setEmail(event.target.value)}></InputField>
          {signUpForm ? (
            <>
              <InputField
                type='text'
                placeholder='First name'
                value={firstName}
                onChange={(event) => {
                  setFirstName(event.target.value)
                }}
              ></InputField>
              <InputField
                type='text'
                placeholder='Last name'
                value={lastName}
                onChange={(event) => {
                  setLastName(event.target.value)
                }}
              ></InputField>
            </>
          ) : null}
          <InputField type='password' placeholder='Password' value={password} onChange={(event) => setPassword(event.target.value)}></InputField>
          {signUpForm ? <Button onClick={passwordRegister}>Sign Up</Button> : <Button onClick={passwordSignIn}>Login</Button>}
          <RememberMeWrapper>
            <Checkbox type='checkbox'></Checkbox>
            <Text>Remember Me</Text>
          </RememberMeWrapper>
          <Link href='/'>Forgot your password</Link>
        </LoginForm>
        <GoogleSign onClick={googleSignIn}>Sign in with Google</GoogleSign>
      </LoginBox>
    </LoginWrapper>
  )
}

const mapDispathToProps = (dispatch) => {
  return {
    onSetUser: (user) => dispatch(actions.setUser(user)),
  }
}

export default connect(null, mapDispathToProps)(Login)

const LoginWrapper = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;
`
const LoginBox = styled.div`
  width: 25vw;
  height: 70vh;
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07), 0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
    0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
`
const WhatsAppImage = styled.img`
  object-fit: contain;
  height: 110px;
  margin-top: 5vh;
`
const LoginOptions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 1vh;
  position: relative;
  align-items: center;
  overflow: hidden;
  transition: all 2s ease;
`
const InputField = styled.input`
  padding: 5px;
  margin: 5px;
`
const Button = styled(Btn)`
  // color: white !importent;
  // width: 200px;
  // margin-top: 50px !important;
  // text-transform: inherit !important;
  // background-color: #0a8d48 !important;
`
const GoogleSign = styled(Btn)``

const RememberMeWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`
const CreateNewAccount = styled.p`
  font-size: 0.8rem;
  background-color: blue;
`
const Link = styled.a``
const Text = styled.p`
  margin: 0px;
`
