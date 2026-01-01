// // // home page

import NewsForm from "@/components/NewsForm";
import { getNews } from "@/lib/actions"
import { NewsModel } from "@/models/model";

// import DeleteEmployee from "@/components/DeleteEmployee";
// import { Button } from "@/components/ui/button";
// import { getEmployees } from "@/lib/actions"
// import { Employee } from "@/models/model";
// import { Edit2Icon, Trash2Icon } from "lucide-react";
// import Link from "next/link";

// // import { Comment } from "@/models/model"
// // import axios from "axios"
// // import { Metadata } from "next"


// // export const metadata: Metadata = {
// //   title: 'Home'
// // }

// // export default async function Home() {
// //   const response = await axios.get('https://jsonplaceholder.typicode.com/comments')
  
// //   const comments = response.data;
// //   return (
// //     <div className="p-2">
// //      {comments.map((comment : Comment) => {
// //       return <div key={comment.id}>{comment.email}</div>
// //      })

// //     }
// //     </div>
// //   )
// // }



// export default async function Home() {
//   const employees: Employee[] = await getEmployees();

//   return (
//     <div >
//       <h1 className="text-2xl font-bold text-center my-3 tracking-wider">Employees</h1>
       
//       <div>
//     {employees.map((employee : Employee)=> (
//       <div key={employee.id} className="border p-4 mb-2">
        
//         <h2><b>Name:</b> {employee.name}</h2>
//         <h2><b>Position:</b> {employee.position}</h2>
//         <h3><b>Age:</b> {employee.age}</h3>

//         <div className="flex mt-2">
//           <Link href={`/employees/${employee.id}`}>
//            <Button variant={'ghost'} className="hover:bg-zinc-400">
//                 <Edit2Icon/>
//                 </Button>
//           </Link>
//         <DeleteEmployee id={employee.id ?? ''}/>
//           </div>
//       </div>
      
//     ))}

//       </div>

//       <h1 className="text-md font-light justify-self-end my-2">Total employees: {employees.length}</h1>


      
      


      
//     </div>
//   )
// }




export default async function Home() {
  const res = await getNews();
  
  const news: NewsModel[] = res.data ?? []
  return (
    <div>
      {
        news.map((news: any) => {
          return(
            <div key={news.id}>
              <h2>{news.title}</h2>
              <p>{news.description}</p>
            </div>
          )
        })
      }
      {/* <NewsForm/> */}
    </div>
  )
}
