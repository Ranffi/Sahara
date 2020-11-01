import React, {Component} from 'react';
import {getUser, getOrderHistory } from '../redux/store'
import { connect } from 'react-redux'
import SingleOrder from './SingleOrder'

class OrderHistory extends Component{
  constructor() {
    super()
    this.state = {
    }
  }

  async componentDidMount(){
    await this.props.getUser();
    this.props.getOrderHistory(this.props.user.id);
  }

  render(){
    const {orderHistory, user} = this.props
    console.log(orderHistory)
    if (!orderHistory){return (
      <div>Loading</div>
    )}
    if (orderHistory.length === 0){
      return (
        <div>You have not made a purchase</div>
      )
    }
    return (
      <>
        <h2>
          My Order History
        </h2>
        <div>
          {
            orderHistory.map( order => {
              return (<SingleOrder key = {order.id} order = {order} user = {user} />)
            })
          }
        </div>
      </>
    )
  }

}

export default connect(
  ({user, orderHistory }) => ({
    user,
    orderHistory
  }),
  (dispatch) => {
    return {
    getUser: () => dispatch(getUser()),
    getOrderHistory: (userId) => dispatch(getOrderHistory(userId))
  }
}
)(OrderHistory)
