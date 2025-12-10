import { MinusIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import { AvatarImage, Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Table, TableBody, TableHead, TableCell, TableRow, TableHeader } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux';

import { removeCart, setCart } from './cartSlice';
import { base } from '../../app/mainApi';
import ShowDialogue from '@/components/ShowDialogue';
import CheckOutPart from './CheckOutPart';



export default function CheckOut() {
  const { carts } = useSelector((state) => state.cartSlice);
  const dispatch = useDispatch();

  const handleAdd = (item) => {
    dispatch(setCart({ ...item, quantity: item.quantity + 1 }));
  }
  const handleRemove = (item) => {
    dispatch(setCart({ ...item, quantity: item.quantity - 1 }));
  }

  const handleRemoveItem = (item) => {
    dispatch(removeCart(item));
  }
return (
  <div className="px-4 md:px-10 py-6">
    <h2 className="text-2xl font-bold mb-6">Checkout Page</h2>

    <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8">

    
      <div className="w-full border rounded-xl p-4 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {carts.map(item => (
              <TableRow key={item.id}>

                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="rounded">
                      <AvatarImage src={`${base}/uploads/${item.image}`} />
                      <AvatarFallback>{item.title[0]}</AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.brand}</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>{item.category}</TableCell>

                <TableCell>
                  <div className="flex items-center gap-3">
                    <Button
                      onClick={() => handleRemove(item)}
                      disabled={item.quantity === 1}
                      size="icon"
                      variant="outline"
                    >
                      <MinusIcon size={16} />
                    </Button>

                    <span className="font-semibold">{item.quantity}</span>

                    <Button
                      onClick={() => handleAdd(item)}
                      disabled={item.quantity === item.stock}
                      size="icon"
                      variant="outline"
                    >
                      <PlusIcon size={16} />
                    </Button>
                  </div>
                </TableCell>

                <TableCell className="font-semibold">
                  Rs. {item.price * item.quantity}
                </TableCell>

                <TableCell>
                  <ShowDialogue
                    func={() => handleRemoveItem(item)}
                    detail="This item will be removed from your cart."
                  >
                    <Button variant="ghost" size="icon">
                      <Trash2Icon className="text-red-500" />
                    </Button>
                  </ShowDialogue>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

     
      <div className="sticky top-20 h-fit">
        <CheckOutPart carts={carts} />
      </div>

    </div>
  </div>
)
}
