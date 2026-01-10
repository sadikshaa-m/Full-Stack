import { Post } from '@/models/model'
import axios from 'axios'

export default async function PostsPage() {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    const posts = response.data;
  return (
    <div className='p-2'>
      {posts.map((post : Post)=> {
        return <h1 key={post.id}>{post.title}</h1>
      })}
    </div>
  )
}
