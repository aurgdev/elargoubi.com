import Image from "next/image";
import FeaturedPosts from "./featured-post";

type props = {
  title: string;
  description: string;
};

export default function NotFoundComponent({ title, description }: props) {
  return (
    <main className="min-h-[60vh] max-w-7xl mx-auto md:px-16 px-6 mt-32 lg:mt-44">
      <header className="max-w-4xl">
        <Image
          width={80}
          height={80}
          src={"/searching-duck.gif"}
          alt="Yellow duck searching"
        />
        <h1 className="font-incognito font-black tracking-tight sm:text-6xl text-3xl lg:leading-[3.7rem] leading-tight mt-6 mb-3">
          {title}
        </h1>
        <p className="max-w-2xl text-base dark:text-zinc-400 text-zinc-600 leading-relaxed">
          {description}
        </p>
      </header>

      <div className="max-w-4xl grid lg:grid-cols-2 grid-cols-1 gap-4 mt-12">
        <FeaturedPosts />
      </div>
    </main>
  );
}
