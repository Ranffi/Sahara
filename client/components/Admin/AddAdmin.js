import {connect} from 'react-redux';
import React, {Component} from 'react';
import { getAllUsers, getAllAdmins, manageAdmin } from '../../redux/store';

class AddAdmin extends Component{
  constructor() {
    super()
    this.state = {
        value: '',
        user: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addToValue = this.addToValue.bind(this);
    this.removeAdmin = this.removeAdmin.bind(this)
  }

  componentDidMount(){
      this.props.getUsers()
      this.props.getAdmins()
  }

  addToValue(firstName, lastName, user){
        let name = firstName + ' ' + lastName
    this.setState({
        value: name,
        user: user
    })
  }

  handleChange(ev) {
    this.setState({
        value: ev.target.value
    })
  }

  async removeAdmin(id){
    await this.props.manageAdmin(id, false)
    this.props.getAdmins()
  }

  async handleSubmit(){
    // ev.preventDefault()
    await this.props.manageAdmin(this.state.user.id, true)
    this.props.getAdmins()
    this.setState({
        value: '',
        user: ''
    })
  }

  render(){
    const filter = this.state.value.toLocaleUpperCase()
    const { value } = this.state
    const { users, admins } = this.props
    return (
      <div>
        <form>
            <input type="text" placeholder="Search..." value={this.state.value} onChange={this.handleChange} autoComplete="off" />
        </form>
        <button type="submit" onClick={() => this.handleSubmit()}>Add</button>
        <ul>
            {
                admins.map( admin => {
                        return (
                        <li key ={admin.id}>{admin.firstName} {admin.lastName} <button onClick={() => this.removeAdmin(admin.id)}>Remove</button></li>
                        )
                    }
                )
            }
        </ul>
        <ul id="admin_search" className={value !== '' ? '' : 'hidden'}>
            {
                users.map( user => {
                    if (user.firstName.toUpperCase().indexOf(filter) > -1 || user.lastName.toUpperCase().indexOf(filter) > -1 && filter !== '') {
                        return (
                        <a key ={user.id} onClick={() => this.addToValue(user.firstName, user.lastName, user)}>{user.firstName} {user.lastName}</a>
                        )
                    }
                })
            }
        </ul>
      </div>
    )
  }

}

export default connect(
    ({ users, admins }) => {return {
        users,
        admins
      }
      },
      (dispatch) => {return {
          getUsers: () => dispatch(getAllUsers()),
          getAdmins: () => dispatch(getAllAdmins()),
          manageAdmin: (id, status) => dispatch(manageAdmin(id, status))
      }}
)(AddAdmin);
