import React from 'react'

import FormInput from '../form-input'
import CustomButton from '../custom-button'

import { signInWithGoogle } from '../../utils/firebase'

import './sign-in.scss'

class SignIn extends React.Component {
  state = {
    email: '',
    password: '',
  }

  handleSubmit = e => this.setState({ email: '', password: '' })

  handleChange = e => {
    const { name, value } = e.target

    this.setState({ [name]: value })
  }

  render() {
    const { email, password } = this.state

    return (
      <div className="sign-in">
        <h2 className="title">I already have an account</h2>
        <span>Create your account with email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            label="Email"
            value={email}
            onChange={this.handleChange}
            required
          />

          <FormInput
            name="password"
            type="password"
            label="Password"
            value={password}
            onChange={this.handleChange}
            required
          />

          <div className="buttons">
            <CustomButton type="submit">Sign In</CustomButton>
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
              Sign in with Google
            </CustomButton>
          </div>
        </form>
      </div>
    )
  }
}

export default SignIn
