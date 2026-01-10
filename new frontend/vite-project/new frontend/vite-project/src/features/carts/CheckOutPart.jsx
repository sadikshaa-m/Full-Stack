
//order summary wala part

import ShowDialogue from "@/components/ShowDialogue"
import { Button } from "@/components/ui/button"
import { useCreateOrderMutation } from "../orders/orderApi"
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "@/components/ui/spinner";
import { clearCart } from "./cartSlice";

export default function CheckOutPart({carts}) {

    const [addOrder, {isLoading}] = useCreateOrderMutation();
    const dispatch = useDispatch();
    const totalAmount = carts.reduce((total, item)=> total + item.price * item.quantity, 0);

    const {user} = useSelector((state)=> state.userSlice);
    const handleOrder = async() => {
        try{
            await addOrder({
                token: user.token,
                body: {
                    products: carts.map((item)=> ({
                        productId: item.id,
                        quantity: item.quantity,
                    })),
                    totalAmount
                }
            }).unwrap();
            dispatch(clearCart());

            toast.success('Order placed successfully');

        }catch(err){
            toast.error(err.data.message);
        }
    }

return (
  <div className="w-full border rounded-xl p-6 shadow-md bg-white">
    <h2 className="text-xl font-bold mb-5 text-center">Order Summary</h2>

    <div className="space-y-4">
      {carts.map((item) => (
        <div key={item.id} className="flex justify-between text-sm">
          <span>{item.title}</span>
          <span>{item.quantity} × Rs. {item.price}</span>
        </div>
      ))}

      <hr className="my-3" />

      <div className="flex justify-between font-semibold">
        <span>Total Items</span>
        <span>{carts.length}</span>
      </div>

      <div className="flex justify-between text-lg font-bold text-green-600">
        <span>Total Price</span>
        <span>Rs. {totalAmount}</span>
      </div>
    </div>

    <ShowDialogue func={handleOrder} detail="Are you sure you want to place this order?">
      <Button disabled={isLoading || !carts.length} className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-semibold">
        {isLoading && <Spinner />}
        Place Order
      </Button>
    </ShowDialogue>
  </div>
)

}
