import Laptop from "@/components/3d-laptop";
import { Slide } from "@/components/animation/slide";
import EmptyState from "@/components/pages/empty-state";
import ProjectCard from "@/components/pages/project";
import Social from "@/components/pages/social";
import { sanityFetch } from "@/sanity/sanity-client";
import { profileQuery, projectsQuery } from "@/sanity/sanity-query";
import type { ProfileType, ProjectType } from "@/types";

export default async function Home() {
  const profile: ProfileType[] = await sanityFetch({
    query: profileQuery,
    tags: ["profile"],
  });
  const projects: ProjectType[] = await sanityFetch({
    query: projectsQuery,
    tags: ["project"],
  });

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6 lg:mt-44 mt-32">
      <section className="flex lg:flex-row flex-col items-center justify-between gap-x-12 pb-16 ">
        {profile &&
          profile.map((data) => (
            <div key={data._id} className="lg:max-w-2xl max-w-2xl">
              <Slide>
                <h1 className="font-incognito font-black tracking-tight text-3xl sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight lg:min-w-[700px] min-w-full">
                  {data.headline}
                </h1>
                <p className="text-base opacity-80 dark:opacity-70 leading-relaxed">
                  {data.shortBio}
                </p>
              </Slide>
              <Slide delay={0.1}>
                <Social type="social" />
              </Slide>
            </div>
          ))}
        <Slide delay={0.14}>
          <Laptop />
        </Slide>
      </section>
      <section className="space-y-12">
        <Slide delay={0.1}>
          <h1 className="font-incognito font-black tracking-tight sm:text-5xl text-3xl mb-6 lg:leading-[3.7rem]">
            Projects
          </h1>
          <p className="text-base opacity-80 dark:opacity-70 leading-relaxed">
            I&apos;ve worked on tons of little projects over the years but these
            are the ones that I&apos;m most proud of. Many of them are
            open-source, so if you see something that piques your interest,
            check out the code and contribute if you have ideas on how it can be
            improved.
          </p>
        </Slide>
        <Slide delay={0.1}>
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          ) : (
            <EmptyState value="Projects" />
          )}
        </Slide>
      </section>
    </main>
  );
}
