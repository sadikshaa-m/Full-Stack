'use client'

import { NewsModel } from "@/models/model"
import { Button } from "./ui/button"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { Formik } from "formik"
import { updateNews } from "@/lib/actions"
import toast from "react-hot-toast"
import { Input } from "./ui/input"
import { Spinner } from "./ui/spinner"


export default function UpdateNews({news}: {news: NewsModel}) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    

  return (
    <div>
        <Formik
        initialValues={{
            title: news.title,
            description: news.description,
            image: news.image
        }}
        onSubmit={(val) => {
            startTransition(async() => {
                const res = await updateNews(news.id ?? '' , val);
                if(res.success){
                    toast.success(res.message);
                } else {
                    toast.error(res.message);
                }

            })
        }}
        >
            {({handleChange, handleSubmit, values}) => (
                <form onSubmit={handleSubmit} className='flex flex-col gap-7 border border-gray-300  max-w-md w-full rounded-xl shadow-sm p-5'>
                    <Input
                        value={values.title}
                        onChange={handleChange}
                        name="title"
                        placeholder="Title"
                         className='w-full '
                    />
                    <Input
                        value={values.description}
                        onChange={handleChange}
                        name="description"
                        placeholder="Description"
                         className='w-full '
                    />
                    <Input
                        value={values.image}
                        onChange={handleChange}
                        name="image"
                        placeholder="Image"
                         className='w-full '
                    />
                    <Button type="submit"
                    className='w-full mt-2'>
                        {isPending && <Spinner/>}
                        Submit
                    </Button>
                </form>
            )}

        </Formik>
     
    </div>
  )
}
