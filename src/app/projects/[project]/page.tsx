import Image from "next/image";
import { Metadata } from "next";
import { singleProjectQuery } from "@/sanity/sanity-query";
import type { ProjectType } from "@/types";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/sanity-image";
import { sanityFetch } from "@/sanity/sanity-client";
import { Slide } from "@/components/animation/slide";
import { CustomPortableText } from "@/components/pages/custom-portable-text";
import { siteConfig } from "@/config/site";

type Props = {
  params: {
    project: string;
  };
};

const fallbackImage: string = "";

// Dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.project;
  const project: ProjectType = await sanityFetch({
    query: singleProjectQuery,
    tags: ["project"],
    qParams: { slug },
  });

  return {
    title: `${project.name} | Project`,
    metadataBase: new URL(`${siteConfig.url}/projects/${project.slug}`),
    description: project.tagline,
    openGraph: {
      images:
        urlFor(project.coverImage?.image).width(1200).height(630).url() ||
        fallbackImage,
      url: `${siteConfig.url}/projects/${project.slug}`,
      title: project.name,
      description: project.tagline,
    },
  };
}

export default async function Project({ params }: Props) {
  const slug = params.project;
  const project: ProjectType = await sanityFetch({
    query: singleProjectQuery,
    tags: ["project"],
    qParams: { slug },
  });

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6 lg:mt-44 mt-32">
      <Slide>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-start justify-between mb-4">
            <h1 className="font-incognito font-black tracking-tight sm:text-5xl text-3xl mb-4 max-w-sm">
              {project.name}
            </h1>

            <a
              href={project.projectUrl}
              rel="noreferrer noopener"
              target="_blank"
              className={`dark:bg-primary-bg bg-secondary-bg dark:text-white text-zinc-700 border border-transparent rounded-md px-4 py-2 ${
                !project.projectUrl
                  ? "cursor-not-allowed opacity-80"
                  : "cursor-pointer hover:border-zinc-700"
              }`}
            >
              {project.projectUrl ? "Explore" : "Coming Soon"}
            </a>
          </div>

          <div className="relative w-full h-40 pt-[52.5%]">
            <Image
              className="rounded-xl border dark:border-zinc-800 border-zinc-100 object-cover"
              layout="fill"
              src={project.coverImage?.image || fallbackImage}
              alt={project.coverImage?.alt || project.name}
              quality={100}
              placeholder={project.coverImage?.lqip ? `blur` : "empty"}
              blurDataURL={project.coverImage?.lqip || ""}
            />
          </div>

          <div className="mt-8 dark:text-zinc-400 text-zinc-600 leading-relaxed">
            <PortableText
              value={project.description}
              components={CustomPortableText}
            />
          </div>
        </div>
      </Slide>
    </main>
  );
}
