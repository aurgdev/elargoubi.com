import Refractor from "react-refractor";
import js from "refractor/lang/javascript";
import ts from "refractor/lang/typescript";
import tsx from "refractor/lang/tsx";
import jsx from "refractor/lang/jsx";
import sql from "refractor/lang/sql";
import bash from "refractor/lang/bash";
import markdown from "refractor/lang/markdown";
import css from "refractor/lang/css";
import scss from "refractor/lang/scss";
import python from "refractor/lang/python";
import html from "refractor/lang/markup";
import yaml from "refractor/lang/yaml";
import graphql from "refractor/lang/graphql";
import json from "refractor/lang/json";
import { Copy } from "lucide-react";

// Supported languages: https://prismjs.com/#supported-languages
Refractor.registerLanguage(js);
Refractor.registerLanguage(ts);
Refractor.registerLanguage(jsx);
Refractor.registerLanguage(tsx);
Refractor.registerLanguage(sql);
Refractor.registerLanguage(bash);
Refractor.registerLanguage(markdown);
Refractor.registerLanguage(css);
Refractor.registerLanguage(scss);
Refractor.registerLanguage(python);
Refractor.registerLanguage(html);
Refractor.registerLanguage(yaml);
Refractor.registerLanguage(graphql);
Refractor.registerLanguage(json);

type codeTypes = {
  value: {
    code: string;
    language: string;
    filename?: string | null;
  };
};

export default function CodeBlock({ value }: codeTypes) {
  // Hide react defaultProps error on Refractor. Ref: https://github.com/reactjs/rfcs/pull/107
  const error = console.error;
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };

  return (
    <div className="my-6">
      <div className="flex items-center justify-between bg-zinc-50 dark:bg-[#141414] border dark:border-zinc-800 border-zinc-200 rounded-t-lg px-4 py-3 translate-y-2">
        <p className="text-sm">{value.filename || ""}</p>
        <button>
          <Copy />
        </button>
        {/* // TODO: Implement copy code to clipboard feature */}
      </div>
      <Refractor
        language={value.language ? value.language : "jsx"}
        value={value.code}
        className="text-sm border-x border-b dark:border-zinc-800 border-zinc-200 rounded-b-lg tracking-normal"
      />
    </div>
  );
}
