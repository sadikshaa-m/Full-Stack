import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { MinusIcon, PlusIcon } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from './cartSlice';
import { useNavigate } from 'react-router';


export default function AddToCart({product}) {
  const {carts} = useSelector((state)=> state.cartSlice);
  const isExist = carts.find((cart)=> cart.id === product._id);
  const [quantity, setQuantity] = useState(isExist?.quantity || 1);
  //action call garna use dispatch hooks
  const dispatch = useDispatch();
  const increment = () => setQuantity(quantity + 1);
  const decrement = () => setQuantity(quantity - 1);
  const {user} = useSelector((state) => state.userSlice);
  const nav = useNavigate();
 const handleCart = () => {
  dispatch(setCart({
    id: product._id,
    title: product.title,
    price: product.price,
    stock: product.stock,
    brand: product.brand,
    category: product.category,
    image: product.image,
    quantity

  }));
  nav('/checkout');
 }

  return (
    
    <div className='mt-8 flex flex-col'>
      <div className='flex flex-row justify-between items-center'>
<Button  disabled={quantity === 1} onClick={decrement}  className={'bg-black text-white cursor-pointer'}>
        <MinusIcon/>
      </Button>
      

    <h4 className='font-semibold'>{quantity}</h4>

      <Button disabled={quantity === product?.stock} onClick={increment}  className={'bg-black text-white cursor-pointer'} >
        <PlusIcon/>
      </Button>

     
    </div>

      <Button disabled={user?.role === 'admin' || !user }
       onClick={handleCart} className={'cursor-pointer mt-4 tracking-widest bg-green-500 hover:bg-green-600  font-semibold'}>Add To Cart</Button>
    </div>
  )
}
