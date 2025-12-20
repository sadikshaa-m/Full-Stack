// // home page

import { getEmployees } from "@/lib/actions"
import { Employee } from "@/models/model";

// import { Comment } from "@/models/model"
// import axios from "axios"
// import { Metadata } from "next"


// export const metadata: Metadata = {
//   title: 'Home'
// }

// export default async function Home() {
//   const response = await axios.get('https://jsonplaceholder.typicode.com/comments')
  
//   const comments = response.data;
//   return (
//     <div className="p-2">
//      {comments.map((comment : Comment) => {
//       return <div key={comment.id}>{comment.email}</div>
//      })

//     }
//     </div>
//   )
// }



export default async function Home() {
  const employees: Employee[] = await getEmployees();

  return (
    <div >
      <h1 className="text-2xl font-bold text-center my-3 tracking-wider">Employees</h1>
       
      <ul>
    {employees.map((employee : Employee)=> (
      <li key={employee.id} className="border p-4">
        <h2><b>Name:</b> {employee.name}</h2>
        <h2><b>Position:</b> {employee.position}</h2>
        <h3><b>Age:</b> {employee.age}</h3>
      </li>
    ))}

      </ul>

      <h1 className="text-md font-light justify-self-end my-2">Total employees: {employees.length}</h1>


      
      


      
    </div>
  )
}
