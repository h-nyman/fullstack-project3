import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function HighlightedCode({ snippet }) {
    return <SyntaxHighlighter
        language={snippet.language || "javascript"}
        style={materialLight}
        showLineNumbers={true}
    >
        {snippet.code}
    </SyntaxHighlighter>
}