import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import HomePage from './pages/homepage'

import './App.css'

const Hats = () => (
  <div>
    <h1>Hats Page</h1>
  </div>
)

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop/hats" component={Hats} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
