import axios from 'axios';
import React, {Component} from 'react';
import validate from 'validate.js'
import {getAddress} from '../redux/user'
import { connect } from 'react-redux'
import { toast} from 'react-toastify'

class ProfileSettings extends Component{
    constructor() {
        super()
        this.state = {
          userName: '',
          password: '',
          email: '',
          streetAddress: '',
          city: '',
          state: 'AL',
          zipCode: '',
          firstName: '',
          lastName: '',
          isGuest: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
      }
      async componentDidMount(){
       await this.props.getAddress(this.props.user.shippingAddressId);
      }

      async componentDidUpdate(){
        if (this.state.userName === ''){
          await this.props.getAddress(this.props.user.shippingAddressId);
          this.setState({
            userName: this.props.user.userName,
            email: this.props.user.email,
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            streetAddress: this.props.address.streetAddress,
            city: this.props.address.city,
            zipCode: this.props.address.zipCode,
            state: this.props.address.state
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
          let id = this.props.user.shippingAddressId
          const {data} = await axios.put('/api/address', {...this.state, id})
          await axios.put(`/api/users/${this.props.user.id}`, {...this.state, shippingAddressId: data.id})
          toast.success('Success! Changes Successfully Saved');
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
            <input name = "firstName" className = "signUpInput" onChange = {handleChange} value = {this.state.firstName} required />

            <label htmlFor = "lastName" className = "signUpLabel">Last Name:</label>
            <input name = "lastName" className = "signUpInput" onChange = {handleChange} value = {this.state.lastName} required />

            <label htmlFor = "userName" className = "signUpLabel">User Name:</label>
            <input name = "userName" className = "signUpInput" onChange = {handleChange} value = {this.state.userName} required />

            <label htmlFor = "password" className = "signUpLabel">Password:</label>
            <input name = "password" type="password" className = "signUpInput" onChange = {handleChange} value = {this.state.password} />

            <label htmlFor = "email" className = "signUpLabel">Email:</label>
            <input name = "email" type="email" className = "signUpInput" onChange = {handleChange} value = {this.state.email} required />
          </div>
          <div id = "signUpAddress">
            <label htmlFor = "streetAddress" className = "signUpLabel">Street Address:</label>
            <input name = "streetAddress" className = "signUpInput" onChange = {handleChange} value = {this.state.streetAddress} required />

            <label htmlFor = "city" className = "signUpLabel">City:</label>
            <input name = "city" className = "signUpInput" onChange = {handleChange} value = {this.state.city} required />

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
            <input name = "zipCode" className = "signUpInput" onChange = {handleChange} value = {this.state.zipCode} type="text" pattern="[0-9]*" required />
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
      user: user.user,
      address: user.address
    }
  },
  (dispatch) => {
    return {
    getAddress: (id) => dispatch(getAddress(id))
  }
}
)(ProfileSettings)
