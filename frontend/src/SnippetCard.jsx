export default function SnippetCard({snippet, removeSnippet}){
    async function deleteSnippet() {
        const response = await fetch("/api/snippets/" + snippet._id, {
            method: "DELETE"
        })
        const json = await response.json()
        removeSnippet(json.id)
    }
    return <details>
        <summary>{snippet.title}</summary>
        <div>
            <div>{snippet.language}</div>
            <pre>{snippet.code}</pre>
            <button type="button" onClick={deleteSnippet}>Delete</button>
        </div>
    </details>
}