import React, { Component } from 'react'
import LoginForm from '../components/LoginForm.js'
import SignUp from './SignUp.js'
import ManagerHomePage from './ManagerHomePage.js'
import EmployeeHomePage from './EmployeeHomePage.js'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { connect } from 'react-redux'
import { login, authorizeToken } from '../actions/authorizeActions'
import { changeLoading } from '../actions/loadingActions'


class Login extends Component {

  state = {
    username: null,
    password: null,
    loading: false
  }

  componentDidMount() {
      const token = localStorage.getItem("token")
      this.props.authorizeToken(token)
    }

  handleLoginFormChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleLoginSubmit = (e) => {
    e.preventDefault()
    // this.setState({ loading: true})
    this.props.changeLoading(true)
    this.props.login(this.state)
  }

  mainPage = () => {
    console.log(this.props)
    if (this.props.user.account_type === "MANAGER") {
      return (<ManagerHomePage />)
    } else if (this.props.user.account_type === "EMPLOYEE") {
      return (<EmployeeHomePage />)
    } else {
      if (this.props.loading) {
        return (
        <div className="loader"></div>
      )
      } else {
        return (
          <LoginForm handleLoginSubmit={this.handleLoginSubmit} handleLoginFormChange={this.handleLoginFormChange} />
        )
      }
    }
  }


  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
        <Switch>
          <Route exact path="/signup" render={(props) => <SignUp history={props.history} adapter={this.adapter} handleSignUp={this.handleSignUp} />} />
          <Route path="/" render={() => this.mainPage()} />
        </Switch>
        </React.Fragment>
      </BrowserRouter>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    user: state.user,
    loading: state.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (loginObj) => dispatch(login(loginObj)),
    authorizeToken: (token) => dispatch(authorizeToken(token)),
    changeLoading: (status) => dispatch(changeLoading(status))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
