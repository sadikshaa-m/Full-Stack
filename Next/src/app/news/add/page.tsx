'use client'


import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { addNews } from '@/lib/actions'
import { useActionState } from 'react'


const action = async (prevState: any, formData: FormData) => {
  const res = await addNews({
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    image: formData.get('image') as string
  });
  return res;
}


export default function AddNews() {

  const [error, submitAction, isPending] = useActionState(action, null);



  return (
    <form action={submitAction} className='flex flex-col gap-7 border border-gray-300  max-w-md w-full rounded-xl shadow-sm p-5'>
      <Input
        name='title'
        placeholder='Title'
        className='w-full '
      />
      <Input
        name='description'
        placeholder='Description'
        className='w-full '
      />
      <Input
        name='image'
        placeholder='Image'
        className='w-full '
      />

      <Button type='submit' className='w-full mt-2'>Submit</Button>

    </form>
  )
}
