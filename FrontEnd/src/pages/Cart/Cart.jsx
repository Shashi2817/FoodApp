import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'
import AppDownload from '../../components/AppDownload/AppDownload'
import { assets } from '../../assets/assets'

const Cart = () => {

  const { cartItem, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext)

  const navigate = useNavigate();

  return (
    <div className='container'>
      <div className='img'>
        <img src={assets.cartHeader} alt="" />
        <p className='img-text'> We Will try our best to Deliver your meal as fast as possible.<br></br> stay tuned with us</p>

      </div>
      <div className='cart'>
        <div className="cart-item">
          <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {food_list.map((item, index) => {
            if (cartItem[item._id] > 0) {
              return (
                <>
                  <div className="cart-items-title cart-items-item">
                    <img src={url + '/images/' + item.image} alt="" />
                    <p>{item.name}</p>
                    <p>₹{item.price}</p>
                    <p>{cartItem[item._id]}</p>
                    <p>₹{item.price * cartItem[item._id]}</p>
                    <p onClick={() => removeFromCart(item._id)} className='cross'>X</p>
                  </div>
                  <hr />
                </>
              )
            }
          })}
        </div>
        <div className="cart-buttom">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 40}</p>
            </div>
            <div className="cart-total-details">
              <p>Total</p>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 40}</b>
            </div>
            <button onClick={() => navigate('/order')}>PROCEDD TO CHECKOUT</button>
          </div>
          <div className="cart-promocode">
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='Promo Code' />
              <button>Submit</button>
            </div>
          </div>
        </div>

      </div>
      <div className="app">
        <AppDownload />
      </div>
    </div>
  )
}

export default Cart