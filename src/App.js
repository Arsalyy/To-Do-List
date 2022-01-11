import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import ToDoList from './pages/toDoList'
import Welcome from './pages/welcome'
import SignUp from './pages/signUp'
import LogIn from './pages/logIn'
import './App.css'

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/tasks" exact component={ToDoList} />
        <Route path="/log-in" exact component={LogIn} />
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/" exact component={Welcome} />
        <Redirect to="/" />
      </Switch>
    </React.Fragment>
  )
}

export default App
