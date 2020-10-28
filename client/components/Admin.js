import {connect} from 'react-redux';
import React, {Component} from 'react';

class Admin extends Component{
  constructor() {
    super()
    this.state = {
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value
    })
  }

  handleSubmit(ev){
    ev.preventDefault()
    this.setState({
    })
  }

  render(){
    return (<div><p>{`Testing admin page and user on state. State.user is user #${this.props.user.id}, with userName of ${this.props.user.userName} (guest username is null)`}</p></div>)
  }

}

export default connect(
  ({user}) => ({
    user
  }),
  null
)(Admin);
