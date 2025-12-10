


// product ko list dekhauni admin panel ma


import { useGetProductsQuery } from "../products/productApi"
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { base } from "../../app/mainApi";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { RemoveProduct } from "./RemoveProduct";







export default function AdminPanel() {
  const nav = useNavigate();

  const { isLoading, error, data } = useGetProductsQuery();

 if (isLoading) return (
  <dotlottie-wc
    // src="https://lottie.host/0a35ef3a-73e5-4144-85fb-5554ba79f603/zH3aaN6SLS.lottie"
    src='loading.lottie'
    autoplay
    loop
  ></dotlottie-wc>
);
  if (error) {
  let errMsg = "Something went wrong";

  if (error?.data) {
    if (typeof error.data === "string") errMsg = error.data;
    else if (typeof error.data.message === "string") errMsg = error.data.message;
    else errMsg = JSON.stringify(error.data);
  } else if (error?.error) {
    errMsg = error.error;
  }

  return <h1 className="text-pink-950">{errMsg}</h1>;
}

  return (
    <div className="p-5">

      <div className="mb-4">
        <Button
          onClick={() => nav('/product-add')}
          className={'bg-green-700'}>Add Product</Button>
      </div>

      <div className='w-full'>
        <div className='[&>div]:rounded-sm [&>div]:border'>
          <Table>
            <TableHeader>
              <TableRow className='hover:bg-transparent'>
                <TableHead>Name</TableHead>
                <TableHead>Id</TableHead>
                <TableHead>CreatedAt</TableHead>
                <TableHead>Update</TableHead>
                <TableHead >Remove</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.products?.map(item => (
                <TableRow key={item._id}>
                  <TableCell>
                    <div className='flex items-center gap-3'>
                      <Avatar>
                        <AvatarImage src={`${base}/${item.image}`} alt={item.image} />

                      </Avatar>
                      <div className='font-medium'>{item.title}</div>
                    </div>
                  </TableCell>
                  <TableCell>{item._id}</TableCell>
                  <TableCell>{item.createdAt}</TableCell>
                  <TableCell>
                    <Button onClick={() => nav(`/product-edit/${item._id}`)} >
                      <EditIcon />
                    </Button>
                  </TableCell>
                  <TableCell >
                    <RemoveProduct id={item._id} />

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

      </div>

    </div>
  )
}

