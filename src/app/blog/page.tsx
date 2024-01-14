import { Metadata } from "next";
import Social from "@/components/pages/social";
import { Slide } from "@/components/animation/slide";
import { ListCollapse } from "lucide-react";
import Posts from "@/components/pages/posts";

export const metadata: Metadata = {
  title: "Blog",
};

export default async function Blog() {
  return (
    <>
      <section className="max-w-[950px] mb-12 pb-12 border-b dark:border-zinc-800 border-zinc-100">
        <div className="max-w-2xl">
          <Slide>
            <h1 className="font-incognito font-black tracking-tight sm:text-5xl text-3xl mb-6 lg:leading-[3.7rem]">
              Blog
            </h1>
            <p className="text-base dark:text-zinc-400 text-zinc-600 leading-relaxed mb-8">
              Welcome to my blog domain where I share personal stories about
              things I&apos;ve learned, projects I&apos;m hacking on and just
              general findings. I also write for other publications.
            </p>

            <Social type="publication" />
          </Slide>
        </div>
      </section>

      <Slide delay={0.1}>
        <div className="flex items-center gap-x-3 mb-8">
          <ListCollapse />
          <h2 className="text-xl font-semibold tracking-tight">Explore All</h2>
        </div>
        <Posts />
      </Slide>
    </>
  );
}
