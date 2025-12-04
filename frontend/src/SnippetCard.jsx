export default function SnippetCard({snippet}){
    return <details>
        <summary>{snippet.title}</summary>
        <div>
            <div>{snippet.language}</div>
            <pre>{snippet.code}</pre>
            <button type="button">Delete</button>
        </div>
    </details>
}