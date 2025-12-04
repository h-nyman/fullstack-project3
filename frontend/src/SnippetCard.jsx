export default function SnippetCard({snippet, deleteSnippet}){
    return <details>
        <summary>{snippet.title}</summary>
        <div>
            <div>{snippet.language}</div>
            <pre>{snippet.code}</pre>
            <button type="button" onClick={deleteSnippet}>Delete</button>
        </div>
    </details>
}