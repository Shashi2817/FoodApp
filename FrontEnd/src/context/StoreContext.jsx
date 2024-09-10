import { createContext, useEffect, useState } from "react";
import axios from 'axios';


export const StoreContext = createContext(null)


const StoreContextProvider = (props) => {

    const [cartItem, setCartItem] = useState({});
    const url = 'https://foodapp-backend-0ipw.onrender.com/
    const [token, setToken] = useState('');
    // const [username, setUsername] = useState('');
    const [food_list, setFoodlist] = useState([])

    const  addToCart = async (itemId) => {
        if (!cartItem[itemId]) {
            setCartItem((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if(token){
            await axios.post(url+'/api/cart/add',{itemId},{headers:{token}});
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }


    const getTotalCartAmount = ()=>{
        let totalAmount = 0;
        for(const item in cartItem){
            if(cartItem[item]>0){
            let itemInfo = food_list.find((product)=>product._id===item);
            // console.log((itemInfo))
            // totalAmount += itemInfo.price*cartItem[item];
            console.log('Item Info:', itemInfo);
            if (itemInfo && typeof itemInfo.price !== 'undefined') {
                totalAmount += itemInfo.price * cartItem[item];
            } else {
                console.warn(`Item with id ${item} not found or has no price`); 
            }
        }

        }
        return totalAmount;
    }

    const fetchFoodlist = async ()=>{
        const response = await axios.get(url + '/api/food/list')
        setFoodlist(response.data.data)
    }

    const loadCartData = async (token)=>{
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
        setCartItem(response.data.cartData);
        // console.log(response.data.cartData); 
    }



    useEffect(()=>{
       

        async function loadData(){
            await fetchFoodlist();
            if(localStorage.getItem('token')){
                setToken(localStorage.getItem('token'));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])

    const contextValue = {
        food_list,
        cartItem,
        setCartItem,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
       
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider
