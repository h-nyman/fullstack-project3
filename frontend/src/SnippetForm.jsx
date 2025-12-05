export default function SnippetForm({ createSnippet }) {
    async function onSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const snippet = Object.fromEntries(formData.entries())
        createSnippet(snippet)
        e.target.reset()
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