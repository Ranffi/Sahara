import axios from 'axios'
import React, {Component} from 'react';
import {getUser} from '../redux/store'
import { connect } from 'react-redux'

class Account extends Component{
  constructor() {
    super()
    this.state = {
    }
  }

  componentDidMount(){
    this.props.getUser();
  }


  render(){
    return (
      <>
        <h2>
          My Account
        </h2>
      </>
    )
  }

}

export default connect(
  ({user}) => {
    return user
  },
  (dispatch) => {
    return {
    getUser: () => dispatch(getUser())
  }
}
)(Account)
