import Link from "next/link";
import { PortableTextComponents } from "@portabletext/react";
import Favicon from "@/lib/favicon";
import { ExternalLink } from "lucide-react";

export const CustomPortableTextFavicon: PortableTextComponents = {
  block: {
    h3: ({ children }) => (
      <h3 className="font-mono before:content-['#'] before:hidden hover:before:inline before:absolute before:-left-5 before:text-2xl before:top-1/2 before:-translate-y-1/2 before:opacity-80 dark:before:text-zinc-500 before:text-zinc-400 relative inline-block font-semibold tracking-tight text-2xl mt-6 mb-2">
        <Link
          href={`#${children?.toString().toLowerCase().replaceAll(" ", "-")}`}
        >
          {children}
        </Link>
      </h3>
    ),
    normal: ({ children }) => <p className="mt-2 mb-6">{children}</p>,
  },
  marks: {
    link: ({ children, value }) => {
      return (
        <a
          className="font-medium inline-flex items-center justify-start gap-x-1 dark:text-blue-400 text-blue-500 underline"
          href={value?.href}
          rel="noreferrer noopener"
          target="_blank"
        >
          {value?.href ? (
            <Favicon domain={value?.href} alt={value?.href} />
          ) : (
            <ExternalLink />
          )}
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-none mt-2 ml-2 opacity-80 dark:opacity-70">
        {children}
      </ul>
    ),
  },
  listItem: { bullet: ({ children }) => <li className="mb-4 ">{children}</li> },
};
