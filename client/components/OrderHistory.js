import React, {Component} from 'react';
import {getOrderHistory} from '../redux/items'
import { connect } from 'react-redux'
import SingleOrder from './SingleOrder'

class OrderHistory extends Component{
  constructor() {
    super()
    this.state = {
    }
  }

  async componentDidMount(){
    await this.props.getOrderHistory(this.props.user.id);
  }

  render(){
    const {orderHistory, user} = this.props
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
        <div className='test'>
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
  ({user, items }) => ({
    user: user.user,
    orderHistory: items.orderHistory
  }),
  (dispatch) => {
    return {
    getOrderHistory: (userId) => dispatch(getOrderHistory(userId))
  }
}
)(OrderHistory)
