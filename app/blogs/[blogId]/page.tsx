import ButtonBack from "@/components/ButtonBack";
import { getSortedBlogsData, getBlogData } from "@/lib/blogs";
import { notFound } from "next/navigation";

export default async function Project({ params }: {params : {blogId: string}}) {
    const blogs = getSortedBlogsData();
    const blogId = params.blogId;

    if (!blogs.find((project) => (project.id === blogId))) {
        return notFound();
    }

    const project = await getBlogData(blogId);

    return (
        <div className="max-w-screen-md container mx-auto px-4 flex flex-col justify-center dark:bg-dark-1 bg-grey-3 ">
            {/* Back button */}
            <div className="p-10"></div>
            
            <ButtonBack />
            <div className="markdown flex flex-col items-center">
                <section dangerouslySetInnerHTML={{ __html: project }} />
            </div>  

        </div>
    );
}