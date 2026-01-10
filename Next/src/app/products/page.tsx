import { Product } from "@/models/model";
import axios from "axios"

export default async function Products() {
    const response = await axios.get('https://dummyjson.com/products')
    const products : Product[] = response.data.products;
  return (
    <div>
      
      <h1 className="text-center text-2xl font-bold tracking-wider p-10 pb-5 bg-pink-200">Available Products</h1>
    <div className="grid sm:grid-cols-1 md:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_1fr_1fr] gap-7 p-5 bg-pink-200 ">
      {products.map((product : Product) => {
        return <div key={product.id} className=" p-2 pl-4 cursor-pointer shadow-xl rounded-lg shadow-pink-300 hover:bg-pink-100  hover:scale-105 hover:-translate-y-1
             hover:shadow-2xl transition-all duration-300 ease-out hover:z-10
">
          <img src={product.images[0]} alt={product.title} className="mb-2 object-cover"></img>
            <h1 className="font-bold text-[20px] mb-1 line-clamp-2 text-center">{product.title}</h1>
             <h1 className="font-semibold pt-4 pb-2">{product.brand ? `Brand: ${product.brand}` : product.tags?.length ? `Tags: ${product.tags.join(' , ')}` : ''}</h1>
            <p className="text-[14px] mb-2 line-clamp-2">{product.description}</p>
            <div className="flex justify-between font-semibold pb-2 items-center">
              <h1 className="text-pink-600 border-2 px-3 py-1 rounded-full border-pink-500">$ {product.price}</h1>
              
            </div>
        </div>
      })}
    </div>
    </div>
  )
}
