import CopyButton from "./CopyButton"
import HighlightedCode from "./HighlightedCode"

export default function SnippetCard({ snippet, deleteSnippet, startEditing }) {
    return <div className="snippet-card">
        <details>
            <summary>{snippet.title}</summary>
            <div>
                <div className="snippet-language">{snippet.language}</div>
                <HighlightedCode snippet={snippet} />
                <CopyButton code={snippet.code} />
                <button type="button" onClick={startEditing}>Edit</button>
                <button className='delete-button' type="button" onClick={deleteSnippet}>Delete</button>
            </div>
        </details>
    </div>
}