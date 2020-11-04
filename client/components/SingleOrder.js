import React from 'react';

const SingleOrder = ({order, user}) => {
  const cartItems = order.cartItems;
  const purchaseDate = (new Date(order.createdAt)).toDateString();
  return (
    <div id = "orderHistoryContainer">
      <div id = "orderHistoryHeader">
        <div>Order Placed: {purchaseDate}</div>
        <div> Shipped To: {order.user.shippingAddress.streetAddress} </div>
      </div>
      <div id = "orderHistoryBody">
        {
          cartItems.map(cartItem => {
            return (
              <div className="bookContainer" key={cartItem.book.id}>
                <div className="img-container">
                <img src={cartItem.book.coverImageUrl} alt="product" className="book-img" />
                </div>
                  <h3>{cartItem.book.title}</h3>
                  <h4>by: {cartItem.book.author.firstName} {cartItem.book.author.lastName}</h4>
                  <h3>${cartItem.book.price}</h3>
                  <h3>Quantity: {cartItem.quantity}</h3>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default SingleOrder
