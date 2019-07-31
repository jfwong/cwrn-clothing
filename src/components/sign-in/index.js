import React, { useState } from 'react'
import { connect } from 'react-redux'

import FormInput from '../form-input'
import CustomButton from '../custom-button'

import {
  googleSignInStart,
  emailSignInStart,
} from '../../redux/user/user-actions'

import './sign-in.scss'

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  })
  const { email, password } = userCredentials

  const handleSubmit = async e => {
    e.preventDefault()

    emailSignInStart({ email, password })
  }

  const handleChange = e => {
    const { name, value } = e.target

    setUserCredentials({ ...userCredentials, [name]: value })
  }

  return (
    <div className="sign-in">
      <h2 className="title">I already have an account</h2>
      <span>Create your account with email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          label="Email"
          value={email}
          onChange={handleChange}
          required
        />

        <FormInput
          name="password"
          type="password"
          label="Password"
          value={password}
          onChange={handleChange}
          required
        />

        <div className="buttons">
          <CustomButton type="submit">Sign In</CustomButton>
          <CustomButton
            type="button"
            onClick={googleSignInStart}
            isGoogleSignIn
          >
            Sign in with Google
          </CustomButton>
        </div>
      </form>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: emailAndPassword =>
    dispatch(emailSignInStart(emailAndPassword)),
})

export default connect(
  null,
  mapDispatchToProps,
)(SignIn)
