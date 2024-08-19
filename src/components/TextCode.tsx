"use client";
import React, { useEffect } from "react";
import Prism from "prismjs";

require("prismjs/components/prism-json");

type TextCodeProps = {
  code: string;
  language: string;
  className?: string;
};

const TextCode = (
  { code, language, className }: TextCodeProps = {
    code: "",
    language: "",
    className: "",
  }
) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div className={className}>
      <pre className={`language-${language}`}>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};

export default TextCode;
