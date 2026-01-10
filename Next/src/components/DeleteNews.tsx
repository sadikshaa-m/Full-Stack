'use client'

import { useTransition } from "react"
import { Button } from "./ui/button"
import { removeNews } from "@/lib/actions";
import toast from "react-hot-toast";
import { Trash2Icon } from "lucide-react";
import { Spinner } from "./ui/spinner";


export default function DeleteNews({id} : {id : string}) {
  const [isLoading, startTransition] = useTransition();

  const handleRemove = () => {
    startTransition(async () => {
      const res = await removeNews(id);
      if(res.success){
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    })
  }
  return (
    <div>
      {isLoading ? <Button disabled variant={'ghost'}><Spinner/></Button>
       :
      <Button onClick={handleRemove} variant={'ghost'} className="text-red-600"><Trash2Icon/></Button> } 
    </div>
  )
}
