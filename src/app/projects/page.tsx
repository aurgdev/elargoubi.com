import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { projectsQuery } from "@/sanity/sanity-query";
import type { ProjectType } from "@/types";
import { sanityFetch } from "@/sanity/sanity-client";
import { Slide } from "@/components/animation/slide";
import EmptyState from "@/components/pages/empty-state";
import ProjectCard from "@/components/pages/project";

export const metadata: Metadata = {
  title: "Project",
};

export default async function Project() {
  const projects: ProjectType[] = await sanityFetch({
    query: projectsQuery,
    tags: ["project"],
  });

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6 lg:mt-44 mt-32">
      <header className="max-w-2xl mb-16">
        <Slide>
          <h1 className="font-incognito font-black tracking-tight sm:text-5xl text-3xl mb-6 lg:leading-[3.7rem]">
            Projects
          </h1>
          <p className="text-base dark:text-zinc-400 text-zinc-600 leading-relaxed">
            I&apos;ve worked on tons of little projects over the years but these
            are the ones that I&apos;m most proud of. Many of them are
            open-source, so if you see something that piques your interest,
            check out the code and contribute if you have ideas on how it can be
            improved.
          </p>
        </Slide>
      </header>

      <Slide delay={0.1}>
        {projects.length > 0 ? (
          <ul
            role="list"
            className="grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
          >
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
              // <Link
              //   href={`/projects/${project.slug}`}
              //   key={project._id}
              //   className="flex items-center gap-x-4 border border-transparent bg-secondary p-4 rounded-lg"
              // >
              //   <Image
              //     src={project.logo}
              //     width={60}
              //     height={60}
              //     alt={project.name}
              //     className="bg-zinc-700 rounded-md p-2"
              //   />
              //   <div>
              //     <h2 className="text-lg tracking-wide mb-1">{project.name}</h2>
              //     <div className="text-sm opacity-80 dark:opacity-70">
              //       {project.tagline}
              //     </div>
              //   </div>
              // </Link>
            ))}
          </ul>
        ) : (
          <EmptyState value="Projects" />
        )}
      </Slide>
    </main>
  );
}
