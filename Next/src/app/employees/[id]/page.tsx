import EditForm from "@/components/EditForm";
import { Button } from "@/components/ui/button";
import axios from "axios";


interface UpdateEmployeeProps {
  id: string;
}

export default async function UpdateEmployee({params}: {params: Promise<UpdateEmployeeProps> }) {
  const {id} = await params;
  const res = await axios.get(`https://68c8e428ceef5a150f629401.mockapi.io/api/new/employees/${id}`)
  return (
   <div>
    <EditForm employee={res.data}/>
   </div>
  )
}
