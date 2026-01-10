import { Card, CardHeader, CardTitle, CardFooter, CardContent } from '@/components/ui/card'
import { base } from '../../app/mainApi'
import { useNavigate } from 'react-router'


export default function ProductCard({ product }) {
  const nav = useNavigate();

  return (
    <div
      onClick={() => nav(`/products/${product._id}`)}
      className='
     hover:scale-[103%] ease-in delay-100 duration-75 transition cursor-pointer relative rounded-xl bg-linear-to-r from-neutral-600 to-violet-300 pt-0'>
      <div className='flex h-[180px] items-center justify-center'>
        <img
          src={`${base}/uploads/${product.image}`}
          alt='Image'
          className='h-full w-full object-cover rounded-t-xl'
        />
      </div>

      <Card className='border-none rounded-t-none bg-linear-to-r from-neutral-300 to-violet-500'>
        <CardHeader className="p-2 uppercase pt-4" >
          <CardTitle>{product.title}</CardTitle>

        </CardHeader>

        <CardContent className=" p-2">
          <p className='line-clamp-3 text-sm'>
            {product.detail}
          </p>
        </CardContent>
        
        <CardFooter className=' justify-between gap-3 max-sm:flex-col max-sm:items-stretch p-2 '>
          <div className='flex flex-col'>
            <span className='text-sm font-medium uppercase'>Price</span>
            <span className='text-xl font-semibold'>Rs.{product.price}</span>
          </div>

        </CardFooter>
      </Card>
    </div>
  )
}

