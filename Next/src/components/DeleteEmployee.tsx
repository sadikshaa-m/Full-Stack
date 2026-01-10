'use client';

import { removeEmployee } from "@/lib/actions";
import { useTransition } from "react"
import { Button } from "./ui/button";
import { Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { Spinner } from "./ui/spinner";

export default function DeleteEmployee({id} : {id: string}) {
    const [isLoading, startTransition] = useTransition();
    const handleRemove = ()=> {
        startTransition(async () => {
            
               const res = await  removeEmployee(id);
               if(res.success) {
                toast.success(res.message);
               } else {
                toast.error(res.message);
               }

        })
    }
  return (
    <div>

     {isLoading ? <Button disabled variant={'ghost'}><Spinner/>loading</Button> 
     :
     <Button onClick={handleRemove} variant={'ghost'} className="text-red-600 hover:bg-red-500">
            <Trash2Icon/>
            </Button>
}
    </div>
  )
}
