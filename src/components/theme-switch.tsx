"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const [mount, setMount] = React.useState(false);
  React.useEffect(() => setMount(true), []);
  const { setTheme, theme } = useTheme();
  if (!mount) return null;

  return (
    <Button
      variant="ghost"
      className="rounded-full"
      size="sm"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" ? <Moon /> : <Sun />}
    </Button>
  );
}
