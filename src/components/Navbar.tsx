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
          <Logo />
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
