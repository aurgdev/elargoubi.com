import { PortableText } from "@portabletext/react";
import { profileQuery } from "@/sanity/sanity-query";
import type { ProfileType } from "@/types";
import { sanityFetch } from "@/sanity/sanity-client";
import { CustomPortableTextFavicon } from "./custom-portable-text-favicon";

export default async function Usage() {
  const profile: ProfileType[] = await sanityFetch({
    query: profileQuery,
    tags: ["profile"],
  });

  return (
    <section className="max-w-2xl">
      <div className="mb-8">
        <h2 className="text-4xl mb-4 font-bold tracking-tight">Usage</h2>
        <p className="opacity-80 dark:opacity-70 max-w-xl">
          Tools, technologies and gadgets I use on a daily basis but not limited
          to.
        </p>
      </div>
      {profile.map((textBlock, id) => (
        <PortableText
          key={id}
          value={textBlock.usage}
          components={CustomPortableTextFavicon}
        />
      ))}
    </section>
  );
}
