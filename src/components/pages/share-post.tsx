"use client";

import { Facebook, Linkedin, MessageCircle, Twitter } from "lucide-react";

type props = {
  title: string;
  slug: string;
  description: string;
};

export default function SharePost({ title, slug, description }: props) {
  const blog = encodeURIComponent("https://elargoubi.com/blog/");
  const options = [
    {
      name: "Twitter",
      icon: Twitter,
      shareUrl: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        "Thank you @aurg_dev for writing this post."
      )}.%0A%0A${title}%0A%0A${blog}${slug}`,
    },
    {
      name: "Linkedin",
      icon: Linkedin,
      shareUrl: `https://linkedin.com/sharing/share-offsite/?url=${blog}${slug}&title=${title}&summary=${description}`,
    },
    {
      name: "Facebook",
      icon: Facebook,
      shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${blog}${slug}`,
    },
    {
      icon: MessageCircle,
      name: "WhatsApp",
      shareUrl: `https://api.whatsapp.com/send?text=${encodeURIComponent(
        "Read this amazing article by Mohamed El argoubi"
      )}.%0A%0A${title}%0A%0A${blog}${slug}`,
    },
  ];

  const openPopup = (url: string) => {
    window.open(
      url,
      "Social Share",
      "width=600,height=600,resizable=yes,scrollbars=yes,status=yes"
    );
  };

  return (
    <section className="border-b  pb-10">
      <h3 className="text-xl font-semibold tracking-tight mb-4">Share Post</h3>

      <div className="flex flex-wrap items-center gap-2 tracking-tight">
        {options.map((data, id) => (
          <button
            key={id}
            onClick={() => openPopup(data.shareUrl)}
            title={`Share to ${data.name}`}
            aria-label={`Share to ${data.name}`}
            className="w-12 h-12 p-2 grid place-content-center text-2xl bg-secondary dark:border-zinc-800 border-zinc-200 rounded-md"
          >
            <data.icon aria-hidden="true" />
          </button>
        ))}
      </div>
    </section>
  );
}
