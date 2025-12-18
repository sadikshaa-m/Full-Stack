// home page

import { Button } from "@/components/ui/button"
import { Comment } from "@/models/model"


import axios from "axios"
import { Metadata } from "next"


export const metadata: Metadata = {
  title: 'Home'
}

export default async function Home() {
  const response = await axios.get('https://jsonplaceholder.typicode.com/comments')
  
  const comments = response.data;
  return (
    <div className="p-2">
     {comments.map((comment : Comment) => {
      return <div key={comment.id}>{comment.email}</div>
     })

    }
    </div>
  )
}
