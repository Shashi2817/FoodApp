import React, { useEffect, useState } from 'react'
import axiose from 'axios'
import './Order.css'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets.js'
import axios from 'axios'

const Order = ({ url }) => {

  const [Orders, setOrders] = useState([]);
  const tem = [];

  
  const fetchAllOrders = async () => {
    const response = await axiose.get(url + '/api/order/list');
    if (response.data.success) {
      response.data.data.forEach(element => {
        if(element.payment){
          tem.push(element)
        }
        else{
          const orderId = element._id;
           axios.post(url+'/api/order/delete',{orderId})

        }
        
      });
      setOrders(tem)
      
    }
    else {
      toast.error('Error')
    }

    //Deleting payment false data




  }

  const statusHandler = async(event,orderId)=>{
     const response = await axiose.post(url+'/api/order/status',{
      orderId,
      status:event.target.value
     })
     if(response.data.success){
      await fetchAllOrders();
     }
    // console.log(event,orderId)
  }

  useEffect(() => {
    fetchAllOrders();
  }, [])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {Orders.map((order, index) => (
          <div className="order-item" key={index}>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p>{item.name + ' - ' + item.quantity}p</p>
                    )

                  }
                  else {
                    return <p>{item.name + ' - ' + item.quantity}p</p>
                  }
                })}
              </p>
              <p className='order-item-name'>
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + "," + order.address.state + "," + order.address.country + ',' }</p>
                <p>{order.address.zipcode}</p>
                <p className='order-item-phone'>{order.address.phone}</p>
              </div>
            </div>

            
            <p>Items:{order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Order Delivered">Order Delivered</option>
            </select>

          </div>
        ))}
      </div>
    </div>
  )
}
export default Order