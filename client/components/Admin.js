import {connect} from 'react-redux';
import React, {Component} from 'react';

class Admin extends Component{
  constructor() {
    super()
    this.state = {
      title: '',
      price: '',
      description: '',
      coverImageURL: '',
      quantityInStock: 1,
      rating: 0,
      featured: false,
      onSale: false
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
    const {user} = this.props;
    const {handleChange, handleSubmit} = this;

    return !user.isAdmin ?
    (<div><p>Check out another page!</p></div>) :
    (
      <div>
        otherwise...
      </div>
    )
  }

}

export default connect(
  ({user}) => ({
    user
  }),
  null
)(Admin);