import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

class HomePage extends Component {

  state = {
    message: null
  }

  render() {
    console.log(this.props)
    return (
        <div>Hello from Manager</div>

    )
  }

}


const mapStateToProps = (state) => {
  return {
        user: state.user
  }
}


export default connect(mapStateToProps)(HomePage)
