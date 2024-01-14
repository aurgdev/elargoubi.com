import Image from "next/image";
import { Metadata } from "next";
import { profileQuery } from "@/sanity/sanity-query";
import type { ProfileType } from "@/types";
import { PortableText } from "@portabletext/react";
import { sanityFetch } from "@/sanity/sanity-client";
import { Download, ExternalLink, Mail } from "lucide-react";
import Usage from "@/components/pages/usage";
import { Slide } from "@/components/animation/slide";
import { CustomPortableText } from "@/components/pages/custom-portable-text";

export const metadata: Metadata = {
  title: "About",
};

export default async function About() {
  const profile: ProfileType[] = await sanityFetch({
    query: profileQuery,
    tags: ["profile"],
  });

  return (
    <>
      {profile &&
        profile.map((data) => (
          <div key={data._id}>
            <section className="relative grid lg:grid-cols-custom grid-cols-1 lg:grid-cols-2 gap-x-6 justify-items-center">
              <div className="order-2 lg:order-none">
                <Slide>
                  <h1 className="font-incognito font-black tracking-tight sm:text-5xl text-3xl lg:leading-tight basis-1/2 mb-8">
                    I&apos;m {data.fullName}. I live in {data.location}, where I
                    ... .
                  </h1>

                  <div className="dark:text-zinc-400 text-zinc-600 leading-relaxed">
                    <PortableText
                      value={data.fullBio}
                      components={CustomPortableText}
                    />
                  </div>
                </Slide>
              </div>

              <aside className="flex flex-col lg:justify-self-center justify-self-start gap-y-8 lg:order-1 order-none mb-12">
                <Slide delay={0.1}>
                  <div className="sticky top-10">
                    <Image
                      className="rounded-2xl mb-4 object-cover max-h-96 min-h-96 bg-top"
                      src={data.profileImage.image}
                      width={400}
                      height={400}
                      quality={100}
                      alt={data.profileImage.alt}
                      placeholder="blur"
                      blurDataURL={data.profileImage.lqip}
                      priority
                    />

                    <div className="flex flex-col text-center gap-y-4">
                      {/* <div className="flex items-center gap-x-3">
                        <a
                          href="https://www.craft.me/s/WQpQF3jrPIodXp"
                          rel="noreferrer noopener"
                          target="_blank"
                          className="flex items-center justify-center text-center gap-x-2 basis-[90%] dark:bg-primary-bg  border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 rounded-md py-2 text-lg font-incognito font-semibold"
                        >
                          View Résumé <ExternalLink className="text-base" />
                        </a>
                        <a
                          href={`${data.resumeURL}?dl=${data.fullName}-resume`}
                          className="flex items-center justify-center text-center dark:text-primary-color text-secondary-color hover:underline basis-[10%] dark:bg-primary-bg bg-zinc-100 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 rounded-md py-3 text-lg"
                          title="Download Resume"
                        >
                          <Download
                            className="text-lg"
                            aria-label="Download Resume"
                          />
                        </a>
                      </div> */}

                      <a
                        href={`mailto:${data.email}`}
                        className="flex items-center gap-x-2 hover:text-primary-color"
                      >
                        <Mail className="text-lg" />
                        {data.email}
                      </a>
                    </div>
                  </div>
                </Slide>
              </aside>
            </section>
            <Slide delay={0.14}>
              <Usage />
            </Slide>
          </div>
        ))}
    </>
  );
}
