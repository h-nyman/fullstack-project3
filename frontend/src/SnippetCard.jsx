import CopyButton from "./CopyButton"

export default function SnippetCard({ snippet, deleteSnippet, startEditing }) {
    return <details>
        <summary>{snippet.title}</summary>
        <div>
            <div>{snippet.language}</div>
            <pre>{snippet.code}</pre>
            <CopyButton code={snippet.code} />
            <button className='delete-button' type="button" onClick={deleteSnippet}>Delete</button>
            <button type="button" onClick={startEditing}>Edit</button>
        </div>
    </details>
}