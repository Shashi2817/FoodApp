import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {

  const { getTotalCartAmount, token, food_list, cartItem, url, removeFromCart } = useContext(StoreContext)


  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const [userdata, setUserData] = useState([])
 
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

 

  const placeOrder = async (event) => {



    event.preventDefault();
    let orderItem = [];
    food_list.map((item) => {
      if (cartItem[item._id] > 0) {
        let itemInfo = item;
        itemInfo['quantity'] = cartItem[item._id];
        orderItem.push(itemInfo)
      }

    })
  

    let orderData = {
      address: data,
      items: orderItem,
      amount: getTotalCartAmount() + 40,
    }
    let response = await axios.post(url + '/api/order/place', orderData, { headers: { token } })

  
    console.log(response.data)
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url)
    }
    else {
  
        let orderId = response.data.orderId
        console.log(orderId)
       await axios.post(url+'/api/order/delete',{orderId})
      alert('Error Check Connection')   
   
    }
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      
      navigate('/cart')
    }
    else if (getTotalCartAmount() === 0) {
     
      navigate('/cart')
    }
  }, [token])



  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-field">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required type="email" placeholder='Email Address' name="email" onChange={onChangeHandler} value={data.email} />
        <input required type="text" placeholder='Street' name="street" onChange={onChangeHandler} value={data.street} />
        <div className="multi-field">
          <input required type="text" placeholder='City' name='city' onChange={onChangeHandler} value={data.city} />
          <input required type="text" placeholder='State' name='state' onChange={onChangeHandler} value={data.state} />
        </div>
        <div className="multi-field">
          <input required type="text" placeholder='Zip code' name='zipcode' onChange={onChangeHandler} value={data.zipcode} />
          <input required type="text" placeholder='Country' name='country' onChange={onChangeHandler} value={data.country} />
        </div>
        <input required type="text" placeholder='Phone' name='phone' onChange={onChangeHandler} value={data.phone} />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>	₹{getTotalCartAmount()}</p>
          </div>
          <div className="cart-total-details">
            <p>Delivery fee</p>
            <p>	₹{getTotalCartAmount() === 0 ? 0 : 40}</p>
          </div>
          <div className="cart-total-details">
            <p>Total</p>
            <b>	₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 40}</b>
          </div>
          <button type='submit'>PROCEDD TO PAYMENT</button>
        </div>

      </div>
    </form>
  )
}

export default PlaceOrder