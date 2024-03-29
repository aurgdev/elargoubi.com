/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
  useMotionValue,
  useTransform,
  MotionValue,
} from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ModeToggle } from "./theme-switch";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import UnmountStudio from "./pages/Unmount";
import { Logo } from "./logo";

export default function Navbar() {
  // const [mount, setMount] = useState<boolean>(false);
  // useEffect(() => setMount(true), []);
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

  const MotionLink = motion(Link);

  const mapRange = (
    inputLower: number,
    inputUpper: number,
    outputLower: number,
    outputUpper: number
  ) => {
    const INPUT_RANGE = inputUpper - inputLower;
    const OUTPUT_RANGE = outputUpper - outputLower;

    return (value: number) =>
      outputLower + (((value - inputLower) / INPUT_RANGE) * OUTPUT_RANGE || 0);
  };

  const setTransform = (
    item: HTMLElement & EventTarget,
    event: React.PointerEvent,
    x: MotionValue,
    y: MotionValue
  ) => {
    const bounds = item.getBoundingClientRect();
    const relativeX = event.clientX - bounds.left;
    const relativeY = event.clientY - bounds.top;
    const xRange = mapRange(0, bounds.width, -1, 1)(relativeX);
    const yRange = mapRange(0, bounds.height, -1, 1)(relativeY);
    x.set(xRange * 10);
    y.set(yRange * 10);
  };

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
  // if (!mount) return null;

  return (
    <UnmountStudio>
      <motion.nav
        className={cn(
          "fixed inset-0 top-4 w-[95%] sm:w-[90%] mx-auto bg-primary/15 font-medium flex max-sm:justify-between gap-4 px-3 z-50 max-w-7xl items-center rounded-full font-mono h-14 p-5 overflow-hidden backdrop-blur-lg ",
          hidden ? "shadow-md dark:shadow-secondary/50 bg-secondary/60" : ""
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
          <AnimatePresence>
            {data.map((item) => {
              const x = useMotionValue(0);
              const y = useMotionValue(0);
              const textX = useTransform(x, (latest) => latest * 0.5);
              const textY = useTransform(y, (latest) => latest * 0.5);
              return (
                <motion.li
                  onPointerMove={(event) => {
                    const item = event.currentTarget;
                    setTransform(item, event, x, y);
                  }}
                  onPointerLeave={(event) => {
                    x.set(0);
                    y.set(0);
                  }}
                  style={{ x, y }}
                  key={item.title}
                  className={cn(
                    "hover:font-semibold",
                    pathname === item.href ? "font-semibold" : ""
                  )}
                  onClick={() => setShowNav(false)}
                >
                  <MotionLink
                    className={cn(
                      "font-medium relative rounded-full text-sm py-2.5 px-5 transition-all duration-500 ease-out hover:bg-secondary-foreground/10",
                      pathname === item.href
                        ? "bg-secondary-foreground/10 text-secondary font-bold"
                        : ""
                    )}
                    href={item.href}
                  >
                    {" "}
                    <motion.span
                      style={{ x: textX, y: textY }}
                      className="z-10 relative"
                    >
                      {item.title}
                    </motion.span>
                    {pathname === item.href ? (
                      <motion.div
                        transition={{ type: "spring" }}
                        layoutId="underline"
                        className="absolute w-full h-full rounded-full left-0 bottom-0 bg-secondary-foreground/80 text-secondary"
                      ></motion.div>
                    ) : null}
                  </MotionLink>
                </motion.li>
              );
            })}
          </AnimatePresence>
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
