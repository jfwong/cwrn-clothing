import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'

import HomePage from './pages/homepage'
import ShopPage from './pages/shoppage'
import CheckOutPage from './pages/checkoutpage'
import SignInAndSignUpPage from './pages/signin-and-signup-page'

import Header from './components/header'

import { selectCurrentUser } from './redux/user/user-selectors'
import { checkUserSession } from './redux/user/user-actions'

import './App.css'

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession()
  }, [checkUserSession])

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/checkout" component={CheckOutPage} />
        <Route
          path="/sign-in"
          render={() =>
            currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
          }
        />
      </Switch>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
