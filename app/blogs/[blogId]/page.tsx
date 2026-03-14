import { getSortedBlogsData, getBlogData, getBlogMeta } from "@/lib/blogs";
import { notFound } from "next/navigation";
import ButtonPersonal from "@/components/ButtonPersonal";
import { IoMdHome } from "react-icons/io";

export async function generateMetadata({ params }: { params: { blogId: string } }) {
    const blogs = getSortedBlogsData();
    const blogId = params.blogId;
    const blogMeta = getBlogMeta(blogId);

    if (!blogs.find((project) => (project.id === blogId))) {
        return {
            title: 'Blog Not Found',
            description: 'The blog you are looking for does not exist',
        };
    }

    return {
        title: blogMeta.title,
        description: blogMeta.description,
        openGraph: {
            title: blogMeta.title,
            description: blogMeta.description,
            url: `https://eyriscrafts.com/blog/${blogId}`,
            images: [
                {
                    url: blogMeta.image,
                    alt: blogMeta.title,
                },
            ],
        },
    };
}

export default async function Blog({ params }: { params: { blogId: string } }) {
    const blogs = getSortedBlogsData();
    const blogId = params.blogId;

    if (!blogs.find((project) => (project.id === blogId))) {
        return notFound();
    }

    const blogContent = await getBlogData(blogId);

    return (
        <main className="max-w-3xl mx-auto px-6 md:px-8 py-16 md:py-24">
            <div className="mb-10">
                <ButtonPersonal
                    text="Home"
                    link="/"
                    icon={<IoMdHome size={18} />}
                    shouldOpenNewTab={false}
                />
            </div>

            <article className="markdown">
                <section dangerouslySetInnerHTML={{ __html: blogContent }} />
            </article>
        </main>
    );
}
