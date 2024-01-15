"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ModeToggle } from "./theme-switch";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import UnmountStudio from "./pages/Unmount";
import { Logo } from "./logo";

export default function Navbar() {
  const [mount, setMount] = useState<boolean>(false);
  useEffect(() => setMount(true), []);
  const data = [
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Projects",
      href: "/projects",
    },
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ];
  const [showNav, setShowNav] = useState<boolean>(false);
  const [hidden, setHidden] = useState(false);

  const pathname = usePathname();

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();

    if (latest > previous && latest > 150) {
      setHidden(true);
      setShowNav(false);
    } else {
      setHidden(false);
    }
  });
  if (!mount) return null;

  return (
    <UnmountStudio>
      <motion.nav
        className={cn(
          "fixed inset-0 top-4 w-[95%] sm:w-[90%] mx-auto bg-primary/15 font-medium flex max-sm:justify-between gap-4 px-3 z-50 max-w-7xl items-center rounded-full font-mono h-14 p-5 overflow-hidden backdrop-blur-lg",
          hidden ? "shadow-md" : ""
        )}
        variants={{
          long: { maxWidth: 1216 },
          short: { maxWidth: 580 },
          hideNav: {
            height: 56,
            borderRadius: 50,

            alignItems: "center",
            transition: { delay: 0, duration: 0.3 },
          },
          showNav: {
            height: 200,
            borderRadius: 22,
            alignItems: "start",
            transition: { delay: 0 },
            // type: "spring",
          },
        }}
        initial={"short"}
        animate={[hidden ? "short" : "long", showNav ? "showNav" : "hideNav"]}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 80,
          damping: 14,
        }}
      >
        <div
          className="min-w-[40px] min-h-[40px] rounded-full gap-2  flex items-center justify-center"
          onClick={() => setShowNav(false)}
        >
          <Link href="/">
            <motion.svg
              className="w-auto lg:h-7 h-6"
              width="110"
              height="48"
              viewBox="0 0 110 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              // transition={{
              //   duration: 2,
              //   ease: "easeInOut",
              // }}
              // initial={{
              //   opacity: 0.5,
              //   strokeDasharray: "100%",
              //   strokeDashoffset: "100%",
              // }}
              // animate={{
              //   opacity: 1,
              //   strokeDashoffset: "0%",
              // }}
            >
              <motion.path
                initial={{
                  pathLength: 0,
                  fill: "none",
                }}
                animate={{
                  pathLength: 1,
                  fill: "currentColor",
                  transition: {
                    duration: 2,
                    ease: "easeInOut",
                  },
                }}
                d="M22.9252 34.64C21.9652 34.64 21.2585 34.4 20.8052 33.92C20.3518 33.4133 19.9652 32.6667 19.6452 31.68C19.3252 30.6667 18.6985 27.9733 17.7652 23.6C17.1518 24.1333 16.1518 24.4267 14.7652 24.48L7.92516 24.72C6.29849 28.6933 5.09849 32.2267 4.32516 35.32C1.76516 34.4133 0.485156 33.3867 0.485156 32.24C0.485156 31.7333 1.25849 29.84 2.80516 26.56C4.35182 23.28 6.09849 19.56 8.04516 15.4C10.0185 11.2133 11.3518 8.17333 12.0452 6.28L12.7652 4.32C12.5518 3.94666 12.0318 3.26666 11.2052 2.28C12.1652 1.96 12.9918 1.8 13.6852 1.8C14.4052 1.8 14.9918 1.85333 15.4452 1.96C15.9252 2.06666 16.3385 2.25333 16.6852 2.52C17.0585 2.76 17.3785 3.01333 17.6452 3.28C17.9385 3.54667 18.2052 3.94667 18.4452 4.48C18.6852 4.98667 18.8852 5.45333 19.0452 5.88C19.2052 6.28 19.3785 6.85333 19.5652 7.6C19.7785 8.34667 19.9385 9 20.0452 9.56C20.1785 10.0933 20.3385 10.8533 20.5252 11.84C20.7385 12.8 20.9518 13.7333 21.1652 14.64C21.3785 15.5467 21.7518 17.28 22.2852 19.84C22.8185 22.3733 23.2318 24.28 23.5252 25.56C23.8452 26.8133 24.2852 28.2267 24.8452 29.8C25.4318 31.3733 26.0452 32.6133 26.6852 33.52C25.1385 34.2667 23.8852 34.64 22.9252 34.64ZM14.6052 9.64C14.2318 10.4933 13.4052 12.32 12.1252 15.12C10.8718 17.8933 9.89849 20.1067 9.20516 21.76H17.4052C16.1518 16 15.2185 11.96 14.6052 9.64ZM54.0264 3.88C54.2397 4.30667 54.3597 4.70666 54.3864 5.08C54.4397 5.45333 54.4664 6.13333 54.4664 7.12C54.4664 8.10666 54.0264 11.6133 53.1464 17.64C52.2664 23.6667 51.8264 27.8933 51.8264 30.32C51.8264 32.72 52.0131 34.36 52.3864 35.24C50.1197 34.6533 48.5731 33.88 47.7464 32.92C46.9197 31.9333 46.5064 30.5733 46.5064 28.84C46.5064 28.3067 46.5197 27.8933 46.5464 27.6C44.1197 32.4 40.7997 34.8 36.5864 34.8C34.3464 34.8 32.6664 34.04 31.5464 32.52C30.4264 30.9733 29.8664 28.5333 29.8664 25.2C29.8664 23.3067 30.1597 19.8933 30.7464 14.96C31.3597 10.0267 31.6664 6.82667 31.6664 5.36C31.6664 3.86667 31.5197 2.72 31.2264 1.92C33.4397 2.48 34.9597 3.22667 35.7864 4.16C36.6397 5.06667 37.0664 6.36 37.0664 8.04C37.0664 9.69333 36.7997 12.3467 36.2664 16C35.7331 19.6267 35.4664 22.56 35.4664 24.8C35.4664 27.0133 35.7864 28.5867 36.4264 29.52C37.0664 30.4533 37.9597 30.92 39.1064 30.92C40.4664 30.92 41.7864 30.32 43.0664 29.12C45.6797 26.64 47.3864 21.88 48.1864 14.84V14.76C48.6131 11.0533 48.8264 8.33333 48.8264 6.6C48.8264 4.86666 48.7731 3.30666 48.6664 1.92C50.6931 2.02667 52.1731 2.34666 53.1064 2.88C53.5064 3.09333 53.8131 3.42667 54.0264 3.88ZM64.5417 34.68C63.0217 34.68 61.9284 34.4133 61.2617 33.88C60.5951 33.3467 60.2617 32.4533 60.2617 31.2C60.2617 29.9467 60.7017 26.16 61.5817 19.84C62.4884 13.4933 62.9417 8.97333 62.9417 6.28C62.9417 3.56 62.7551 1.78667 62.3817 0.959999C65.0751 1.17333 66.8617 2.22667 67.7417 4.12C69.6617 3.05333 71.8351 2.52 74.2617 2.52C76.7151 2.52 78.7151 3.22666 80.2617 4.64C81.8351 6.02667 82.6217 7.64 82.6217 9.48C82.6217 11.32 81.9951 13.16 80.7417 15C79.4884 16.8133 77.6217 18.1867 75.1417 19.12L75.6617 20.68C76.6217 23.6667 78.0084 26.6267 79.8217 29.56C81.6351 32.4667 83.1151 34.4533 84.2617 35.52C83.2751 35.7867 82.2884 35.92 81.3017 35.92C80.3417 35.92 79.3684 35.6 78.3817 34.96C77.3951 34.3467 76.5684 33.6667 75.9017 32.92C75.2617 32.1733 74.5417 30.9867 73.7417 29.36C72.9417 27.7333 72.3684 26.4667 72.0217 25.56C71.6751 24.6533 71.2884 23.6533 70.8617 22.56C70.4617 21.4667 70.2484 20.88 70.2217 20.8C70.1951 20.72 70.1551 20.6267 70.1017 20.52C70.0484 20.3867 70.0084 20.2667 69.9817 20.16C69.3951 20.16 68.8217 20.16 68.2617 20.16L68.1417 18.32C71.5284 18.1867 74.0484 16.9733 75.7017 14.68C76.6084 13.4 77.0617 12.0933 77.0617 10.76C77.0617 10.2533 77.0084 9.76 76.9017 9.28C76.4484 7.54667 75.3684 6.46667 73.6617 6.04C73.1817 5.90666 72.5151 5.84 71.6617 5.84C70.8084 5.84 69.6751 6.12 68.2617 6.68C68.2617 7.69333 67.8751 11.0133 67.1017 16.64C66.3551 22.24 65.9817 26.92 65.9817 30.68C65.9817 32.36 66.0617 33.6667 66.2217 34.6C65.3684 34.6533 64.8084 34.68 64.5417 34.68ZM95.4539 44.24C99.9072 44.24 102.441 39 103.054 28.52C102.067 29.9333 100.881 31.0133 99.4939 31.76C98.1072 32.48 96.6806 32.84 95.2139 32.84C92.6539 32.84 90.4539 31.8 88.6139 29.72C86.7739 27.64 85.8539 24.7467 85.8539 21.04C85.8539 15.9467 87.1739 11.52 89.8139 7.76C91.0939 5.92 92.7472 4.46667 94.7739 3.4C96.8006 2.30666 99.1072 1.76 101.694 1.76C104.307 1.76 106.294 2.44 107.654 3.8C109.041 5.13333 109.734 6.78666 109.734 8.76C109.734 10.7333 109.121 12.2933 107.894 13.44C106.667 14.5867 105.214 15.16 103.534 15.16C102.441 15.16 101.401 14.8933 100.414 14.36C99.4272 13.8267 98.6672 13.0533 98.1339 12.04C98.8539 12.2267 99.5339 12.32 100.174 12.32C101.614 12.32 102.747 11.9067 103.574 11.08C104.427 10.2533 104.854 9.32 104.854 8.28C104.854 7.24 104.507 6.38667 103.814 5.72C103.121 5.02667 102.134 4.68 100.854 4.68C99.1739 4.68 97.6406 5.54667 96.2539 7.28C94.8939 8.98667 93.8672 11.0667 93.1739 13.52C92.4806 15.9467 92.1339 18.4667 92.1339 21.08C92.1339 23.6933 92.6406 25.7467 93.6539 27.24C94.6939 28.7067 95.9472 29.44 97.4139 29.44C98.8806 29.44 100.147 28.72 101.214 27.28C102.307 25.84 102.854 23.8933 102.854 21.44C102.854 20.8267 102.814 20.2 102.734 19.56V19.44C103.321 19.3867 103.934 19.36 104.574 19.36C106.121 19.36 107.187 19.6267 107.774 20.16C108.387 20.6667 108.694 21.5467 108.694 22.8C108.694 30.9333 107.241 37.28 104.334 41.84C103.321 43.4133 102.001 44.6933 100.374 45.68C98.7472 46.6667 96.9072 47.16 94.8539 47.16C92.0539 47.16 89.9472 46.44 88.5339 45C87.1472 43.5867 86.4539 41.96 86.4539 40.12C86.4539 38.28 86.9472 36.8 87.9339 35.68C88.9206 34.5867 90.1472 34.04 91.6139 34.04C92.4139 34.04 93.2939 34.2667 94.2539 34.72C92.8406 36.5067 92.1339 38.3867 92.1339 40.36C92.1339 41.5067 92.4006 42.44 92.9339 43.16C93.4672 43.88 94.3072 44.24 95.4539 44.24Z"
                // fill="none"
              />
            </motion.svg>
          </Link>
        </div>
        <motion.ul
          className={`w-full ${
            showNav
              ? "[--display-from:none] [--display-to:flex]"
              : "max-sm:[--display-from:none] sm:[--display-to:flex]"
          }  [--opacity-from:0.1] [--opacity-to:1] flex-col sm:flex-row items-center justify-center gap-10 max-sm:gap-5 max-sm:pt-0`}
          variants={{
            hidden: {
              display: "var(--display-from, none)",
              opacity: "var(--opacity-from, 1)",
              transition: { duration: 0.1, delay: 0 },
            },
            visible: {
              display: "var(--display-to, none)",
              opacity: "var(--opacity-to, 1)",
              transition: { duration: 0.6, delay: 0.2 },
            },
          }}
          initial={"hidden"}
          animate={[
            // hidden && !showNav ? "hidden" : "visible",
            // showNav ? "visible" : "",
            "visible",
          ]}
        >
          {data.map((item) => (
            <li
              key={item.title}
              className={cn(
                "hover:font-semibold",
                pathname === item.href ? "font-semibold" : ""
              )}
              onClick={() => setShowNav(false)}
            >
              <Link href={item.href}>{item.title}</Link>
            </li>
          ))}
        </motion.ul>

        {/* <motion.div
        className="w-full [--display-from:none][--display-to:inline-block]"
        variants={{
          hidden: {
            display: "var(--display-from, none)",
            transition: { delay: 0, duration: 0.3 },
          },
          visible: {
            display: "var(--display-to)",
            transition: { delay: 0.2, duration: 0.3 },
          },
        }}
        initial="hidden"
        animate={hidden ? "visible" : "hidden"}
      >
        <Button variant={"accent"} className="w-full">
          Contact
        </Button>
      </motion.div> */}
        {!showNav ? <ModeToggle /> : null}

        <Button
          size={"icon"}
          variant={"ghost"}
          className="rounded-full min-w-[40px] sm:hidden"
          onClick={() => {
            setHidden(false);
            setShowNav((prev) => !prev);
          }}
        >
          {showNav ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </motion.nav>
    </UnmountStudio>
  );
}
