import React from 'react'
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

class App extends React.Component {
  componentDidMount() {
    const { checkUserSession } = this.props
    checkUserSession()
    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   if (userAuth) {
    //     const userRef = await createUserProfileDocument(userAuth)
    //     userRef.onSnapshot(snapshot => {
    //       setCurrentUser({
    //         id: snapshot.id,
    //         ...snapshot.data(),
    //       })
    //     })
    //   }
    //   setCurrentUser(userAuth)
    // })
  }

  render() {
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
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    )
  }
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
