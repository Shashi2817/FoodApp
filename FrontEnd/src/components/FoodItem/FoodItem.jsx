import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import {  useNavigate } from 'react-router-dom'


const FoodItem = ({ id, name, price, description, image }) => {

    const { cartItem, addToCart, removeFromCart, url, getTotalCartAmount } = useContext(StoreContext);

    const navigate = useNavigate();
    return (
        <div className='food-item'>
            <div className="food-item-container">
                <img className='food-item-image' src={url + "/images/" + image} alt="" />
                {!cartItem[id]
                    ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white}></img>
                    : <div className='food-item-counter'>
                        <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                        <p>{cartItem[id]}</p>
                        {cartItem[id] === 0 ? <></> :
                            <a href="/cart">
                                <span className='buy-btn'>BUY NOW</span>
                            </a>}
                        <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
                    </div>
                }

                <div className="food-item-info">
                    <div className="food-item-name-rating">
                        <p>{name}</p>
                        <img src={assets.rating_starts} alt="" />
                    </div>
                    <p className="food-item-desc">{description}</p>
                    <p className="food-item-price">₹{price}</p>
                    {/* {console.log(cartItem)} */}


                </div>
            </div>
        </div>
    )
}

export default FoodItem