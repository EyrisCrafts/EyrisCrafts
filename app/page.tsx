
import Image from "next/image";
import avatar from "../public/image.png";
import ButtonPersonal from "@/components/ButtonPersonal";
import TitleText from "@/components/TitleText";

import ListProjects from "@/components/ListProjects";
import ListTech from "@/components/ListTech";

import ListExperience from "@/components/ListExperience";
import { CiLinkedin } from "react-icons/ci";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { IoLogoGithub } from "react-icons/io";
import ListBlogs from "@/components/ListBlogs";

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-2 md:px-3 py-16 md:py-24">
      {/* Header */}
      <header className="flex items-start justify-between mb-16">
        <div className="flex items-center gap-5">
          <Image
            src={avatar}
            alt="Waleed K. Nizamani"
            className="rounded-full object-cover ring-2 ring-accent ring-opacity-30"
            width={56}
            height={56}
          />
          <div>
            <h1 className="text-lg font-semibold tracking-tight">
              Waleed K. Nizamani
            </h1>
            <p className="text-sm text-text-secondary mt-0.5">
              I like building stuff to solve cool problems. Software engineer crafting mobile apps, web platforms, and backend systems — always chasing ideas that mix tech with real-world impact.
            </p>
          </div>
        </div>
      </header>

      {/* Social Links */}
      <div className="flex flex-wrap gap-3 mb-16">
        <ButtonPersonal
          text="Github"
          link="https://github.com/EyrisCrafts"
          icon={<IoLogoGithub size={18} />}
        />
        <ButtonPersonal
          text="Playstore"
          link="https://play.google.com/store/apps/developer?id=EyrisCraft"
          icon={<IoLogoGooglePlaystore size={18} />}
        />
        <ButtonPersonal
          link="https://www.linkedin.com/in/waleed-nizamani-957112104/"
          text="LinkedIn"
          icon={<CiLinkedin size={18} />}
        />
      </div>

      {/* Projects */}
      <section className="mb-16">
        <TitleText text="Projects" />
        <ListProjects />
      </section>

      {/* Blogs */}
      <section className="mb-16">
        <TitleText text="Blogs" />
        <ListBlogs />
      </section>

      {/* Tech */}
      <section className="mb-16">
        <TitleText text="Tech" />
        <ListTech />
      </section>

      {/* Experience */}
      <section className="mb-16">
        <TitleText text="Experience" />
        <ListExperience />
      </section>
    </main>
  );
}
