import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link,useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import axios  from 'axios'



const Navbar = ({setShowLogin}) => {

    const [menu, setMenu] = useState('home')

    // const {getTotalCartAmount,setToken, token} = useContext(StoreContext);

    const {getTotalCartAmount,setToken, token,url} = useContext(StoreContext)
    
    const navigate = useNavigate()
    const logout = ()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        setToken('');
        navigate('/')

        
    }
 const userName = localStorage.getItem('username');

    return (
        <div className='navbar' id='navbar'>
           <Link to='/'> <img src={assets.logo} alt="" className='logo' /></Link>
            <ul className='navbar-menu'>
                <Link to = '/' onClick={() => setMenu("home")} className={menu === 'home' ? "active" : ""}>Home</Link>
                <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === 'menu' ? "active" : ""}>Menu</a>
                <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === 'mobile-app' ? "active" : ""}>Mobile-app</a>
                <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === 'contact-us' ? "active" : ""}>Contact-us</a>
            </ul>


            <div className="right">
                <img src={assets.search_icon} alt="" />
                <div className='navbar-search-icon'>
                   <Link to = '/cart'><img src={assets.basket_icon} alt="" /></Link>
                    <div className={getTotalCartAmount()===0?"":"dot"}></div>
                </div>
                {!token?<button onClick={()=>setShowLogin(true)} >sig in</button>
                 :<div className='navbar-profile'>
                    <img src={assets.profile_icon} alt="" />
                    <p className='username'>{userName}</p>
                    <ul className='nav-profile-dropdown'>
                        <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" />Orders</li>
                        <hr />
                        <li onClick={logout}><img src={assets.logout_icon} alt="" />Logout</li>
                    </ul>

                </div>}
                
            </div>
        </div>
    )
}

export default Navbar