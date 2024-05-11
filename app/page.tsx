
import Image from "next/image";
import avatar from "../public/image.png";
import ButtonPersonal from "@/components/ButtonPersonal";
import TitleText from "@/components/TitleText";

import ListProjects from "@/components/ListProjects";
import ListTech from "@/components/ListTech";

import ListExperience from "@/components/ListExperience";
import ButtonTheme from "@/components/ButtonTheme";
import { CiLinkedin } from "react-icons/ci";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { IoLogoGithub } from "react-icons/io";
import ListBlogs from "@/components/ListBlogs";

export default function Home() {
  
  return (
    <main className="max-w-screen-2xl mx-auto grid grid-cols-12 min-h-screen md:grid-cols-12 bg-grey-3 dark:bg-dark-1 transition duration-300">
      {/* Left Section - Larger, takes up the remaining space on mobile */}
      <section className="col-span-12 md:col-span-7 lg:col-span-9  order-last md:order-none ">
        <section className="px-12 lg:px-32 pt-20">
          {/* Dark Mode */}
          <div className="flex flex-row ">
            <ButtonTheme />
          </div>
          
          {/* Blogs */}
          <TitleText text="Blogs" />
          <ListBlogs />
          
          {/* Projects */}
          <TitleText text="Projects" />
          <ListProjects />
          
          {/* Tech */}
          <TitleText text="Tech" />
          <ListTech  />

          {/* Experience */}

          <TitleText text="Experience" />
          <ListExperience />

        </section>
        {/* Additional content for the left section can go here */}
      </section>

      {/* Right Profile Section - Make it appear first on mobile */}
      <section className="col-span-12 md:col-span-5 lg:col-span-3 flex flex-col items-center px-4 xl:px-0 gap-y-4 order-first md:order-last">
        <div className="p-8 md:p-10"></div>

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

        <p className="text-sm font-semibold text-gray-700" >
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
          text="Github" icon={<IoLogoGithub size={24}/>} />
          <ButtonPersonal
            link="https://www.linkedin.com/in/waleed-nizamani-957112104/"
            text="Linkedin"
            icon={<CiLinkedin size={24}/>}
          />
        </div>
      </section>
    </main>
  );
}
