export default function SnippetForm({ pushSnippet }) {
    async function onSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const snippet = Object.fromEntries(formData.entries())
        const response = await fetch("/api/snippets", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(snippet)
        })
        pushSnippet(await response.json())
    }
    return <form onSubmit={onSubmit}>
        <label>Title:
            <input name="title" type="text"></input>
        </label>
        <label>Language:
            <select name="language">
                <option value="javascript">Javascript</option>
                <option value="python">Python</option>
            </select>
        </label>
        <label>Code:
            <textarea name="code"></textarea>
        </label>
        <button type="submit">Create Snippet</button>
    </form>
}