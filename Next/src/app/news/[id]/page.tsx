import UpdateNews from "@/components/UpdateNews";
import { getNewsById } from "@/lib/actions";

interface NewsProps {
  id: string
}
export default async function NewsById({params}: {params: Promise<NewsProps>}) {
  const {id} = await params;
  const res= await getNewsById(id);
  const data = res.data;

  return (
    <div>
      <UpdateNews news={{
        title:data.title,
        id: data._is.toString(),
        description: data.description,
        image: data.image
      }}
      />
    </div>
  )
}
