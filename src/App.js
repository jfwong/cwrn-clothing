import React, { useEffect, lazy, Suspense } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'

import Header from './components/header'
import Spinner from './components/spinner'
import ErrorBoundary from './components/error-boundary'

import { selectCurrentUser } from './redux/user/user-selectors'
import { checkUserSession } from './redux/user/user-actions'

import './App.css'

const HomePage = lazy(() => import('./pages/homepage'))
const ShopPage = lazy(() => import('./pages/shoppage'))
const CheckOutPage = lazy(() => import('./pages/checkoutpage'))
const SignInAndSignUpPage = lazy(() => import('./pages/signin-and-signup-page'))

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession()
  }, [checkUserSession])

  return (
    <div>
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route exact path="/" component={HomePage} />
            <Route path="/shop" component={ShopPage} />
            <Route path="/checkout" component={CheckOutPage} />
            <Route
              path="/sign-in"
              render={() =>
                currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
              }
            />
          </Suspense>
        </ErrorBoundary>
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
