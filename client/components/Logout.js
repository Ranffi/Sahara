import axios from 'axios';
import React, {Component} from 'react';

class Logout extends Component{
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(ev){
    ev.preventDefault()
    const newUser = await axios.post('/api/logout')
    console.log('xxxxxxxxxxxxxxxx', newUser);
  }

  render(){
    const {handleSubmit} = this;
    return (
      <div>
        <h2>Log out!</h2>
        <form onSubmit = {handleSubmit}>
          <button type ="submit">Log out</button>

        </form>
      </div>

    )
  }

}

export default Logout
