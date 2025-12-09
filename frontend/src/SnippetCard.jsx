import CopyButton from "./CopyButton"
import HighlightedCode from "./HighlightedCode"
import languageList from "./languageList"

export default function SnippetCard({ snippet, deleteSnippet, startEditing }) {
    const snippetLanguage = languageList.find(l => l.id === snippet.language)?.label ?? "Not found"
    return <div className="snippet-card">
        <details>
            <summary>{snippet.title}</summary>
            <div>
                <div className="snippet-language">{snippetLanguage}</div>
                <HighlightedCode snippet={snippet} />
                <CopyButton code={snippet.code} />
                <button type="button" onClick={startEditing}>Edit</button>
                <button className='delete-button' type="button" onClick={deleteSnippet}>Delete</button>
            </div>
        </details>
    </div>
}