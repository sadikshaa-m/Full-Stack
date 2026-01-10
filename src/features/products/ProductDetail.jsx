import { useParams } from "react-router"
import { useGetProductQuery } from "./productApi";
import { base } from "../../app/mainApi";
import AddToCart from "../carts/AddToCart";


export default function ProductDetail() {
  const { id } = useParams();
  const {isLoading, error, data} = useGetProductQuery(id);

  if (isLoading) return <dotlottie-wc
    // src="https://lottie.host/0a35ef3a-73e5-4144-85fb-5554ba79f603/zH3aaN6SLS.lottie"
    src='/loading.lottie'
    autoplay
    loop
  ></dotlottie-wc>

  if (error) return <h3>{error?.error || error.data?.message}</h3>
  return (
    <div className="max-w-5xl mx-auto grid grid-cols-2  mt-11 gap-10">
      <div>
        <img src={`${base}/uploads/${data.data.image}`}></img>
      </div>

      <div className="">
     <h1 className=" uppercase mb-2 tracking-wider">{data.data.title}</h1>
        <p className="text-sm text-zinc-500 mb-2">Price: Rs {data.data.price}</p>
        <p className="text-sm text-zinc-500 mb-2">Stock: {data.data.stock}</p>
        <p className="text-sm text-zinc-500 mb-2">{data.data.detail}</p>
        <div>
    <AddToCart product={data.data} />
        </div>
      </div>

    </div>
  )
}