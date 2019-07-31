import React from 'react'
import { connect } from 'react-redux'

import FormInput from '../form-input'
import CustomButton from '../custom-button'

import { signUpStart } from '../../redux/user/user-actions'

import './sign-up.scss'

class SignUp extends React.Component {
  state = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  handleSubmit = async e => {
    e.preventDefault()

    const { displayName, email, password, confirmPassword } = this.state
    const { signUpStart } = this.props

    if (password !== confirmPassword) {
      alert('passwords are not matched!')
      return
    }

    signUpStart({ email, password, displayName })
  }

  handleChange = e => {
    const { name, value } = e.target

    this.setState({ [name]: value })
  }

  render() {
    const { displayName, email, password, confirmPassword } = this.state

    return (
      <div className="sign-up">
        <h2 className="title">I do not have an account</h2>
        <span>Sign up with your email and password</span>

        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            name="displayName"
            type="text"
            label="Display Name"
            value={displayName}
            onChange={this.handleChange}
            required
          />

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

          <FormInput
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={this.handleChange}
            required
          />

          <CustomButton type="submit">Sign Up</CustomButton>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  signUpStart: userCredentials => dispatch(signUpStart(userCredentials)),
})

export default connect(
  null,
  mapDispatchToProps,
)(SignUp)
