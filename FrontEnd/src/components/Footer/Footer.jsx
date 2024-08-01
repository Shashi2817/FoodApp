import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { Link,useNavigate} from 'react-router-dom'
const Footer = () => {

    

  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi pariatur aspernatur explicabo dicta facere expedita veritatis assumenda officia provident! Inventore quis est soluta animi et recusandae ea doloribus debitis quam!</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <a href='/'><li>Home</li></a>
                    <li>About us</li>
                <li ><a href="/cart">Delivery</a> </li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+917633827049</li>
                    <li>contact@foodie.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className='footer-copyright'>Copyright 2024 @ Foodie.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer