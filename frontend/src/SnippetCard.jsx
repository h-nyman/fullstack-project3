import CopyButton from "./CopyButton"
import HighlightedCode from "./HighlightedCode"

export default function SnippetCard({ snippet, deleteSnippet, startEditing }) {
    return <details>
        <summary>{snippet.title}</summary>
        <div>
            <div>{snippet.language}</div>
            <HighlightedCode snippet={snippet} />
            <CopyButton code={snippet.code} />
            <button className='delete-button' type="button" onClick={deleteSnippet}>Delete</button>
            <button type="button" onClick={startEditing}>Edit</button>
        </div>
    </details>
}