import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCheck } from "@fortawesome/free-solid-svg-icons";
import "./CodeBlock.scss";

const CodeBlock = ({ children, language = "csharp", title, showLineNumbers = true }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="CodeBlock">
      <div className="CodeBlock__Header">
        <span className="CodeBlock__Title">{title || language}</span>
        <button
          type="button"
          className="CodeBlock__CopyButton"
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
        >
          <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
          <span>{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        showLineNumbers={showLineNumbers}
        customStyle={{ margin: 0, borderRadius: 0 }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;