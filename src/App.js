import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import HomePage from './pages/homepage'
import ShopPage from './pages/shoppage'
import SignInAndSignUpPage from './pages/signin-and-signup-page'

import Header from './components/header'

import { auth } from './utils/firebase'

import './App.css'

class App extends React.Component {
  state = {
    currentUser: null,
  }

  unsubscribeFromAuth = null

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user =>
      this.setState({ currentUser: user }),
    )
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Header currentUser={this.state.currentUser} />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/shop" component={ShopPage} />
            <Route path="/sign-in" component={SignInAndSignUpPage} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
