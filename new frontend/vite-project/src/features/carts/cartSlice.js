import { createSlice } from "@reduxjs/toolkit";
import { getCartFromLocal, setCartToLocal } from "../local/local";

//locally halna
export const cartSlice = createSlice({
     name: 'cartSlice',
    initialState: {
        carts: getCartFromLocal()
    },

    //initial value= state
    // ...(3 dots) bhaneko purano value lai copy garcha ani tyo sanga naya add huncha 
    reducers: {
        setCart: (state, action) => {
            //isexist function le check garcha if already exist garcha ki gardaina bhanera
            const isExist = state.carts.find(item => item.id === action.payload.id);
            //state.carts -- current cart array ho
            //action.payload -- new item that you want to add or update
            if(isExist){
                state.carts = state.carts.map((cart)=> {
                    // If the item’s id matches the new item → replace it with the new one (action.payload).
                    return cart.id === action.payload.id ? action.payload: cart;
                });
                setCartToLocal(state.carts);

            }else{
                state.carts = [...state.carts, action.payload];
                setCartToLocal(state.carts);
            }
            // state.carts = [...state.carts, action.payload];
            // setCartToLocal(state.carts);
        },



        //productCart bata remove garni
        removeCart: (state, action)=> {
            state.carts = state.carts.filter(item => item.id !== action.payload.id);
            setCartToLocal(state.carts);
        },

        clearCart: (state)=> {
state.carts = []
setCartToLocal(state.carts);
        }

    
    }
});

export const {setCart, removeCart, clearCart} = cartSlice.actions;
   