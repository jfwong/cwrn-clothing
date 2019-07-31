import React from 'react'
import { connect } from 'react-redux'

import FormInput from '../form-input'
import CustomButton from '../custom-button'

import {
  googleSignInStart,
  emailSignInStart,
} from '../../redux/user/user-actions'

import './sign-in.scss'

class SignIn extends React.Component {
  state = {
    email: '',
    password: '',
  }

  handleSubmit = async e => {
    e.preventDefault()

    const { emailSignInStart } = this.props
    const { email, password } = this.state

    emailSignInStart({ email, password })
  }

  handleChange = e => {
    const { name, value } = e.target

    this.setState({ [name]: value })
  }

  render() {
    const { googleSignInStart } = this.props
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
