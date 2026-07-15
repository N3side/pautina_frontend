import React from 'react';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {dracula} from "react-syntax-highlighter/dist/cjs/styles/prism";

interface Props {
    content: string
    className?: string
}

export default function ParsedContentText({ content, className }: Props) {

    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{

                h1: ({children}) => (
                    <h5 className="font-bold mb-3">
                        {children}
                    </h5>
                ),

                h2: ({children}) => (
                    <h6 className="font-bold mb-3">
                        {children}
                    </h6>
                ),

                h3: ({children}) => (
                    <p className="text-large font-bold mb-3">
                        {children}
                    </p>
                ),

                h4: ({children}) => (
                    <p className="text-default font-semibold mb-3">
                        {children}
                    </p>
                ),

                h5: ({children}) => (
                    <p className="text-secondary font-semibold mb-3">
                        {children}
                    </p>
                ),

                h6: ({children}) => (
                    <p className="text-small font-semibold">
                        {children}
                    </p>
                ),

                a: ({ href, children }) => (
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 font-semibold hover:underline"
                    >
                        {children}
                    </a>
                ),

                ul: ({ children }) => (
                    <ul className="list-disc list-outside pl-5 space-y-3 mb-3">
                        {children}
                    </ul>
                ),

                code({ className, children }) {
                    const match = /language-(\w+)/.exec(className || "");

                    if (match) {
                        return (
                            <SyntaxHighlighter
                                style={dracula}
                                customStyle={{
                                    width: "100%",
                                }}
                                wrapLines={true}
                                lineProps={{
                                    style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' }
                                }}
                                language={match[1]}
                                PreTag="div"
                            >
                                {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                        );
                    }

                    return (
                        <code className="bg-neutral-800 px-1 rounded">
                            {children}
                        </code>
                    );
                },
            }}
        >
            {content}
        </ReactMarkdown>
    );
}