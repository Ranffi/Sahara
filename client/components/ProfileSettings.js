import axios from 'axios';
import React, {Component} from 'react';
import validate, { async } from 'validate.js'
import {getUser} from '../redux/store'
import { connect } from 'react-redux'

class ProfileSettings extends Component{
    constructor() {
        super()
        this.state = {
          userName: '',
          password: '',
          email: '',
          streetAddress: '',
          city: '',
          state: '',
          zipCode: '',
          firstName: '',
          lastName: '',
          isGuest: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
      }
      componentDidMount(){
       this.props.getUser();
      }
      componentDidUpdate(){
        if(this.state.userName === ''){
          this.setState({
            userName: this.props.user.userName,
            email: this.props.user.email,
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName
        })
      }
    }
      handleChange(ev) {
        this.setState({
          [ev.target.name]: ev.target.value
        })
      }
      async handleSubmit(ev){
        ev.preventDefault()
        //Validate if email is an email address
        const constraints = {
          from: {
            email: true
          }
        }
        const validation = validate({from: this.state.email}, constraints)
        if (validation !== undefined){alert('You did not enter a valid email')}
        else {
          if(this.state.password === ''){
            this.setState({password: this.props.user.password})
          }
          if(this.state.userName === ''){
            this.setState({userName: this.props.user.userName})
          }
          if(this.state.firstName === ''){
            this.setState({firstName: this.props.user.firstName})
          }
          if(this.state.lastName === ''){
            this.setState({lastName: this.props.user.lastName})
          }
          if(this.state.email === ''){
            this.setState({email: this.props.user.email})
          }
          const {data} = await axios.post('/api/address', this.state)
          await axios.put(`/api/users/${this.props.user.id}`, {...this.state, shippingAddressId: data.id})
          this.props.getUser();
          this.props.history.push('/books')
        }
      }

  render(){
    const {handleChange, handleSubmit} = this;
    const usStates = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ]
    return (
      <>
        <h2>
          Profile Settings
        </h2>
        <form onSubmit = {handleSubmit} id = "signUpForm">
          <div id = "signUpUserInfo">
            <label htmlFor = "firstName" className = "signUpLabel">First Name:</label>
            <input name = "firstName" className = "signUpInput" onChange = {handleChange} value = {this.state.firstName} />

            <label htmlFor = "lastName" className = "signUpLabel">Last Name:</label>
            <input name = "lastName" className = "signUpInput" onChange = {handleChange} value = {this.state.lastName} />

            <label htmlFor = "userName" className = "signUpLabel">User Name:</label>
            <input name = "userName" className = "signUpInput" onChange = {handleChange} value = {this.state.userName} />

            <label htmlFor = "password" className = "signUpLabel">Password:</label>
            <input name = "password" type="password" className = "signUpInput" onChange = {handleChange} value = {this.state.password} />

            <label htmlFor = "email" className = "signUpLabel">Email:</label>
            <input name = "email" type="email" className = "signUpInput" onChange = {handleChange} value = {this.state.email} />
          </div>
          <div id = "signUpAddress">
            <label htmlFor = "streetAddress" className = "signUpLabel">Street Address:</label>
            <input name = "streetAddress" className = "signUpInput" onChange = {handleChange} value = {this.state.streetAddress} />

            <label htmlFor = "city" className = "signUpLabel">City:</label>
            <input name = "city" className = "signUpInput" onChange = {handleChange} value = {this.state.city} />

            <label htmlFor = "state" className = "signUpLabel">State:</label>
            <select name="state" className = "signUpDrop" onChange = {handleChange}>
            {
              usStates.map(state => {
                return (
                  <option value = {state} key = {state}>{state}</option>
                )
              })
            }
            </select>

            <label htmlFor = "zipCode" className = "signUpLabel">Zip Code:</label>
            <input name = "zipCode" className = "signUpInput" onChange = {handleChange} value = {this.state.zipCode} />
          </div>
          <button type = "submit" id = "signUpSubmit">Save</button>

        </form>
      </>

    )
  }

}

export default connect(
  ({user}) => {
    return {
      user
    }
  },
  (dispatch) => {
    return {
    getUser: () => dispatch(getUser())
  }
}
)(ProfileSettings)
