import React, { useEffect } from 'react'
import ProductCard from '../products/ProductCard'
import { useGetProductsQuery } from '../products/productApi'
import ProductCardSkeleton from '../products/ProductCardSkeleton';
import { Button } from '@/components/ui/button';
import { Formik } from 'formik';
import { Input } from '@/components/ui/input';
import { useSearchParams } from 'react-router';



export default function Home() {
  const [params, setParams] = useSearchParams();
  const queryPage = params.get('page') ?? 1;
  const query = params. get('search') ? {
    search: params.get('search'),
  }: params.get('page') ? {
    page: params.get('page')
  }: null;

  const { isLoading, error, data } = useGetProductsQuery({...query, page:queryPage});

  useEffect(()=> {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [queryPage])



  if (isLoading) return <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-6 items-start">
    <ProductCardSkeleton/>
    <ProductCardSkeleton/>
    <ProductCardSkeleton/>
    <ProductCardSkeleton/>
    <ProductCardSkeleton/>
    <ProductCardSkeleton/>
    <ProductCardSkeleton/>
  </div>

  if (error) return <h1 className="text-pink-950">{error?.error || error.data?.message}</h1>

  return (
   <div>
    
      <h1 className='font-bold tracking-widest text-lg lg:text-2xl'>Welcome To The Shop!</h1>
    
    <Formik
      initialValues={{
        search: ''
      }}
      onSubmit={(val, {resetForm})=> {
        setParams({ search: val.search});
        resetForm();
      }}
    
    >
      {({handleChange, handleSubmit, values, touched, errors})=>
      (

        <form onSubmit={handleSubmit} className='mt-4 mb-4 max-w-sm '>
          <div className='flex gap-3'>
            <Input
            value = {values.search} onChange={handleChange} name= 'search'
            placeholder="Search"/>
            <Button>Search</Button>
          </div>
        </form>
      )
      }
    </Formik>






      <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 mt-6 items-start'>
        {data.products.map((product) => {
          return <ProductCard key={product._id} product={product} />
        })}
      </div>

        <div className='flex gap-3 mt-4 justify-center items-center'>
          <Button disabled={Number(queryPage)===1} onClick={()=> setParams({page: Number(queryPage)-1})}>
            Prev
          </Button>
          <h4>{params.get('page') ?? 1}</h4>
          <Button disabled={data.totalPages===Number(queryPage)} onClick={()=> setParams({page: Number(queryPage) + 1})}>
            Next
          </Button>
        </div>


    </div>
  )
}