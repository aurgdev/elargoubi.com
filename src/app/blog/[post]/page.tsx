import Image from "next/legacy/image";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import type { PostType } from "@/types";
import { singlePostQuery } from "@/sanity/sanity-query";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/sanity-image";
import { sanityFetch } from "@/sanity/sanity-client";
import { Slide } from "@/components/animation/slide";
import { Calendar, ChevronRight, MessageCircle } from "lucide-react";
import { formatDate } from "@/lib/date";
import { CustomPortableText } from "@/components/pages/custom-portable-text";
import SharePost from "@/components/pages/share-post";
import FeaturedPosts from "@/components/pages/featured-post";
import BuyMeACoffee from "@/components/pages/buy-me-a-coffee";
import { siteConfig } from "@/config/site";

type Props = {
  params: {
    post: string;
  };
};

const fallbackImage: string = "";

// Dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.post;
  const post: PostType = await sanityFetch({
    query: singlePostQuery,
    tags: ["Post"],
    qParams: { slug },
  });

  if (!post) {
    notFound();
  }

  return {
    title: `${post.title}`,
    metadataBase: new URL(`${siteConfig.url}/blog/${post.slug}`),
    description: post.description,
    publisher: post.author.name,
    keywords: post.tags,
    alternates: {
      canonical: post.canonicalLink || `${siteConfig.url}/blog/${post.slug}`,
    },
    openGraph: {
      images:
        urlFor(post.coverImage?.image).width(1200).height(630).url() ||
        fallbackImage,
      url: `${siteConfig.url}/blog/${post.slug}`,
      title: post.title,
      description: post.description,
      type: "article",
      siteName: siteConfig.url,
      authors: post.author.name,
      tags: post.tags,
      publishedTime: post._createdAt,
      modifiedTime: post._updatedAt || "",
    },
    twitter: {
      title: post.title,
      description: post.description,
      images:
        urlFor(post.coverImage?.image).width(680).height(340).url() ||
        fallbackImage,
      creator: `@${post.author.twitterUrl.split("twitter.com/")[1]}`,
      site: `@${post.author.twitterUrl.split("twitter.com/")[1]}`,
      card: "summary_large_image",
    },
  };
}

export default async function Post({ params }: Props) {
  const slug = params.post;
  const post: PostType = await sanityFetch({
    query: singlePostQuery,
    tags: ["Post"],
    qParams: { slug },
  });

  if (!post) {
    notFound();
  }

  return (
    <>
      <header>
        <Slide className="relative flex items-center gap-x-2 border-b dark:border-zinc-800 border-zinc-200 pb-8">
          <Link
            href="/blog"
            className="whitespace-nowrap dark:text-zinc-400 text-zinc-400 hover:dark:text-white hover:text-zinc-700 text-sm border-b dark:border-zinc-700 border-zinc-200"
          >
            cd ..
          </Link>
          <ChevronRight />
          <p className="text-zinc-400 text-sm truncate">{post.title}</p>
        </Slide>
      </header>

      <article>
        <Slide className="flex lg:flex-row flex-col relative" delay={0.1}>
          <div className="min-h-full lg:border-r border-r-0 dark:border-zinc-800 border-zinc-200 basis-3/4 pt-10 pb-4 lg:pr-6 px-0">
            <div className="flex items-center gap-x-4 text-md mb-8 dark:text-zinc-400 text-zinc-600">
              <div className="flex items-center gap-x-2">
                <Calendar />
                <time dateTime={post.date ? post.date : post._createdAt}>
                  {post.date
                    ? formatDate(post.date)
                    : formatDate(post._createdAt)}
                </time>
              </div>
              <Link
                href="#comments"
                className="flex items-center gap-x-2 dark:text-primary-color text-tertiary-color"
              >
                <MessageCircle />
                <div className="#comments">Comments</div>
              </Link>
              {/* <div className="flex items-center gap-x-2">
                <BiTime />
                <div className="">5 min</div>
              </div> */}
            </div>
            <h1 className="font-incognito font-semibold tracking-tight sm:text-[2.5rem] lg:leading-none leading-tight text-3xl mb-4">
              {post.title}
            </h1>
            <p className="dark:text-zinc-400 text-zinc-600 max-w-2xl">
              {post.description}
            </p>
            <div className="relative w-full h-40 pt-[52.5%] mt-12">
              <Image
                className="rounded-xl border dark:border-zinc-800 border-zinc-100 object-cover"
                layout="fill"
                src={post.coverImage?.image || fallbackImage}
                alt={post.coverImage?.alt || post.title}
                quality={100}
                placeholder={post.coverImage?.lqip ? `blur` : "empty"}
                blurDataURL={post.coverImage?.lqip || ""}
              />
            </div>

            <div className="mt-8 dark:text-zinc-400 text-zinc-600 leading-relaxed tracking-tight text-lg">
              <PortableText value={post.body} components={CustomPortableText} />
            </div>
          </div>

          <aside className="flex flex-col lg:max-h-full h-max gap-y-8 sticky top-2 bottom-auto right-0 basis-1/4 py-10 lg:px-6 px-0">
            <section className="border-b dark:border-zinc-800 border-zinc-200 pb-10">
              <p className="dark:text-zinc-400 text-zinc-500 text-sm">
                Written By
              </p>
              <address className="flex items-center gap-x-3 mt-4 not-italic">
                <div className="relative w-12 h-12">
                  <Image
                    src={urlFor(post.author.photo.image)
                      .width(80)
                      .height(80)
                      .url()}
                    alt={post.author.photo.alt}
                    layout="fill"
                    className="dark:bg-zinc-800 bg-zinc-300 rounded-full object-cover"
                  />
                </div>
                <div rel="author">
                  <h3 className="font-semibold text-lg tracking-tight">
                    {post.author.name}
                  </h3>
                  <a
                    href={post.author.twitterUrl}
                    className="text-blue-500 text-sm"
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    {`@${post.author.twitterUrl.split("twitter.com/")[1]}`}
                  </a>
                </div>
              </address>
            </section>

            <section className="border-b dark:border-zinc-800 border-zinc-200 pb-10">
              <h3 className="text-xl font-semibold tracking-tight mb-4">
                Tags
              </h3>
              <ul className="flex flex-wrap items-center gap-2 tracking-tight">
                {post.tags.map((tag, id) => (
                  <li
                    key={id}
                    className="dark:bg-primary-bg bg-zinc-100 border dark:border-zinc-800 border-zinc-200 rounded-md px-2 py-1 text-sm"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </section>

            <SharePost
              title={post.title}
              slug={post.slug}
              description={post.description}
            />

            <section className="border-b dark:border-zinc-800 border-zinc-200 pb-10">
              <h3 className="text-xl font-semibold tracking-tight mb-4">
                Featured
              </h3>
              <FeaturedPosts params={params.post} />
            </section>
          </aside>
        </Slide>
      </article>

      {/* <section
        id="#comments"
        className="max-w-3xl mt-10 lg:border-t dark:border-zinc-800 border-zinc-200 lg:py-10 pt-0"
      >
        <h3 className="lg:text-4xl text-3xl font-semibold tracking-tight mb-8">
          Comments
        </h3>
        <Comments />
      </section> */}

      <section className="max-w-3xl lg:py-10 pt-0">
        <h3 className="lg:text-4xl text-3xl font-semibold tracking-tight mb-8">
          Support
        </h3>
        <BuyMeACoffee />
      </section>
    </>
  );
}
