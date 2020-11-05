import {connect} from 'react-redux';
import React, {Component} from 'react';
import AddBooks from './AddBooks';
import EditBooks from './EditBooks';
import AddAdmin from './AddAdmin'

class Admin extends Component {
  constructor() {
    super()
    this.state = {
        selectedForm: ''
    }
    this.toggleForm = this.toggleForm.bind(this);
  }

  toggleForm(className) {
      this.setState({selectedForm: className})
  }

  render(){
    const {user} = this.props;
    const {selectedForm} = this.state;

    return !user.adminStatus ?
    (<div><p>Check out another page!</p></div>) :
    (
        <div>
            <hr />
            <div id="signUpForm">
                <div className="adminNavBar">
                    <div onClick={() => this.toggleForm('addBooks')} className={selectedForm === 'addBooks' ? 'selectedAdmin adminNavElement' : 'adminNavElement'}>Add Books</div>
                    <div onClick={() => this.toggleForm('editBooks')} className={selectedForm === 'editBooks' ? 'selectedAdmin adminNavElement' : 'adminNavElement'}>Edit Books</div>
                    <div onClick={() => this.toggleForm('addAdmin')} className={selectedForm === 'addAdmin' ? 'selectedAdmin adminNavElement' : 'adminNavElement'}>Add Admin</div>
                </div>
                <div>
                    {
                        (
                            selectedForm === 'addBooks' ? <AddBooks /> :
                            selectedForm === 'editBooks' ? <EditBooks /> : selectedForm === 'addAdmin' ?  <AddAdmin /> : null
                        )
                    }
                </div>
            </div>
        </div>
    )
  }

}

export default connect(
  ({user}) => ({
    user: user.user
  }),
  null
)(Admin);
