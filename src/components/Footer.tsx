import Image from "next/image";
import UnmountStudio from "./pages/Unmount";

export default function Footer() {
  return (
    <UnmountStudio>
      <footer className="border-t dark:border-zinc-800 border-zinc-100 mt-44 lg:min-h-[250px] min-h-full relative">
        <div className="max-w-7xl mx-auto flex lg:flex-row flex-col items-center lg:justify-between justify-center gap-y-4 md:px-16 px-6 py-16">
          <div className="flex md:flex-row flex-col items-center gap-x-2">
            <h3 className="font-inter">Built with:</h3>
            <ul className="flex items-center gap-x-2 text-sm  md:mt-0 mt-3">
              <li>
                <a
                  href="https://nextjs.org"
                  rel="noreferrer noopener"
                  target="_blank"
                  className="flex items-center gap-x-2 hover:underline"
                >
                  <Image
                    src={"/nextjs.svg"}
                    width={20}
                    height={20}
                    alt="nextjs logo"
                  />{" "}
                  Next.js
                </a>
              </li>
              <li>
                <a
                  href="https://sanity.io"
                  rel="noreferrer noopener"
                  target="_blank"
                  className="flex items-center gap-x-2 hover:underline"
                >
                  <Image
                    src={"/sanity.png"}
                    width={20}
                    height={20}
                    alt="sanity logo"
                  />{" "}
                  Sanity
                </a>
              </li>
              <li>
                <a
                  href="https://vercel.com"
                  rel="noreferrer noopener"
                  target="_blank"
                  className="flex items-center gap-x-2 hover:underline"
                >
                  <Image
                    src={"/vercel.svg"}
                    width={20}
                    height={20}
                    alt="vercel logo"
                  />{" "}
                  Vercel
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col lg:items-end items-center lg:text-start text-center">
            {/* <a
              className="flex items-center justify-center gap-x-2 dark:bg-primary-bg  border border-transparent  hover:border-zinc-200 rounded-md py-2 px-4 text-center mb-3    font-bold tracking-tight"
              href="https://github.com/aurgdev/elargoubi.com"
              target="_blank"
              rel="noreferrer noopener"
            >
              <GithubIcon />
            </a> */}

            <small className="text-zinc-500">
              Copyright &copy; Mohamed El argoubi {new Date().getFullYear()} All
              rights Reserved
            </small>
          </div>
        </div>
      </footer>
    </UnmountStudio>
  );
}
