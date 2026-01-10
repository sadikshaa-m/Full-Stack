import React from 'react'
import { useGetOrdersQuery } from './orderApi'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { TableCell } from '@/components/ui/table';
import { useNavigate } from 'react-router';

export default function OrderList({user}) {
    const {data, isLoading, error} = useGetOrdersQuery(user?.token);
    const nav = useNavigate();

    if(isLoading) return <h1>Loading...</h1>
    if (error) return <h1>{error?.error || error.data?.message}</h1>

    console.log(data);
  return (
    <div className='p-5'>
      <div className='w-full'>
      <div className='[&>div]:rounded-lg [&>div]:border'>
        <Table>
          <TableHeader>
            <TableRow className='hover:bg-transparent'>
              <TableHead>Order Id</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>View More</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.orders.map(item => (
              <TableRow key={item._id}>
               
                <TableCell>{item._id}</TableCell>
                <TableCell>Rs. {item.totalAmount}</TableCell>
                <TableCell>
                    <Button onClick= {()=> nav(`/orders/${item._id}`)}>View More</Button>
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
