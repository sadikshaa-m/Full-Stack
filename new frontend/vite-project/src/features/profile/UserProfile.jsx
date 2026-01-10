import { useSelector } from "react-redux"
import OrderList from "../orders/OrderList";
import UpdateUser from "./UpdateUser";

export default function UserProfile() {
    const {user} = useSelector((state)=> state.userSlice);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr]">
        <div>
<UpdateUser user={user}/>
        </div>
        <div>

      <OrderList user={user}/>
        </div>
    </div>
  )
}
