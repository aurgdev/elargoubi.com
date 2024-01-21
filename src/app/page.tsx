import { profileQuery, projectsQuery } from "@/sanity/sanity-query";
import type { ProfileType, ProjectType } from "@/types";
import HeroSvg from "@/components/icons/HeroSvg";
import Social from "@/components/pages/social";
import { Slide } from "@/components/animation/slide";
import { sanityFetch } from "@/sanity/sanity-client";
import Image from "next/image";
import Link from "next/link";
import EmptyState from "@/components/pages/empty-state";
import HeroCube from "@/components/cube";

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
      <section className="flex lg:flex-row flex-col items-center justify-between gap-x-12 mb-16 overflow-hidden">
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
          <HeroCube />
          {/* <HeroSvg /> */}
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
            <section className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mb-12 ">
              {projects.map((project) => (
                <Link
                  href={`/projects/${project.slug}`}
                  key={project._id}
                  className="flex items-center gap-x-4 border border-transparent bg-secondary p-4 rounded-lg"
                >
                  <Image
                    src={project.logo}
                    width={60}
                    height={60}
                    alt={project.name}
                    className="bg-zinc-700 rounded-md p-2"
                  />
                  <div>
                    <h2 className="text-lg tracking-wide mb-1">
                      {project.name}
                    </h2>
                    <div className="text-sm opacity-80 dark:opacity-70">
                      {project.tagline}
                    </div>
                  </div>
                </Link>
              ))}
            </section>
          ) : (
            <EmptyState value="Projects" />
          )}
        </Slide>
      </section>
    </main>
  );
}
