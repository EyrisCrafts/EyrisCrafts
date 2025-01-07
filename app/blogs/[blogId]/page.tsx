import ButtonBack from "@/components/ButtonBack";
import { getSortedBlogsData, getBlogData, getBlogMeta } from "@/lib/blogs";
import avatar from "../../../public/image.png";
import { notFound } from "next/navigation";
import Image from "next/image";
import ButtonPersonal from "@/components/ButtonPersonal";
import { IoLogoGithub, IoLogoGooglePlaystore } from "react-icons/io5";
import { CiLinkedin } from "react-icons/ci";
import { IoMdHome } from "react-icons/io";
import Head from "next/head";

export async function generateMetadata({ params }: { params: { blogId: string } }) {
    const blogs = getSortedBlogsData();
    const blogId = params.blogId;

    const blogMeta = getBlogMeta(blogId);

    if (!blogs.find((project) => (project.id === blogId))) {
        return {
            title: 'Blog Not Found',
            description: 'The blog you are looking for does not exist',};
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
                    url: blogMeta.image, // Ensure this is a full URL
                    alt: blogMeta.title,
                },
            ],
        },
    };
}

export default async function Project({ params }: { params: { blogId: string } }) {
    const blogs = getSortedBlogsData();
    const blogId = params.blogId;

    if (!blogs.find((project) => (project.id === blogId))) {
        return notFound();
    }

    const project = await getBlogData(blogId);

    return (
        <>
            <div className="max-w-screen-2xl mx-auto px-4 grid grid-cols-12 min-h-screen md:grid-cols-12">

                <div className="col-span-12 md:col-span-7 lg:col-span-7  order-last md:order-none px-4 flex flex-col justify-center dark:bg-dark-1 bg-grey-3 ">
                    {/* Back button */}
                    <div className="p-5"></div>
                    <div className="md:block hidden">
                        <ButtonPersonal
                            text="Home"
                            link="https://eyriscrafts.com"
                            icon={<IoMdHome size={24} />}
                            shouldOpenNewTab={false}
                        />
                    </div>
                    <div className="p-5"></div>
                    <div className="markdown flex flex-col items-center">
                        <section dangerouslySetInnerHTML={{ __html: project }} />
                    </div>
                </div>
                <div className="lg:col-span-2 hidden lg:block">

                </div>
                <section className="col-span-12 md:col-span-5 lg:col-span-3 flex flex-col items-center px-4 xl:px-0 gap-y-4 order-first md:order-last">
                    <div className="p-8 md:p-10"></div>
                    <div className="md:hidden block w-full ">
                        <ButtonPersonal
                            text="Home"
                            link="https://eyriscrafts.com"
                            icon={<IoMdHome size={24} />}
                            shouldOpenNewTab={false}
                        />
                    </div>

                    {/* Personal Image */}
                    <Image
                        style={{ width: "70%", maxWidth: "150px", aspectRatio: "1" }}
                        src={avatar}
                        alt="Picture of the author"
                        className="rounded-full object-cover"
                    />

                    <h1 className="text-lg text-grey-2">
                        {" "}
                        Waleed K. Nizamani
                    </h1>

                    <p className="text-sm px-10 xl:px-6 text-grey-2 " >
                        Software engineer with a keen interest in economy, science, and gaming
                    </p>

                    <p className="text-sm font-semibold text-gray-300 dark:text-gray-700" >
                        More about me
                    </p>

                    {/* Playstore, github and Linkedin profiles */}
                    <div className="flex flex-wrap gap-2 justify-center">
                        <ButtonPersonal
                            text="Playstore"
                            link="https://play.google.com/store/apps/developer?id=EyrisCraft"
                            icon={<IoLogoGooglePlaystore size={24} />}
                        />
                        <ButtonPersonal
                            link="https://github.com/EyrisCrafts"
                            text="Github" icon={<IoLogoGithub size={24} />} />
                        <ButtonPersonal
                            link="https://www.linkedin.com/in/waleed-nizamani-957112104/"
                            text="Linkedin"
                            icon={<CiLinkedin size={24} />}
                        />
                    </div>
                </section>
            </div>
        </>
    );
}