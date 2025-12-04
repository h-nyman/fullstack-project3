import { useEffect, useState } from 'react'
import './App.css'
import SnippetCard from './SnippetCard'
import LanguageSelect from './LanguageSelect'
import SnippetForm from './SnippetForm'
import EditSnippetDialog from './EditSnippetDialog'

async function fetchSnippets(language) {
  const response = await fetch('/api/snippets?lang=' + language)
  return response.json()
}

function App() {
  const [snippets, setSnippets] = useState([])
  const [language, setLanguage] = useState("")
  const [editingSnippet, setEditingSnippet] = useState(null)
  useEffect(() => {
    fetchSnippets(language).then(setSnippets)
  }, [setSnippets, language])

  function pushSnippet(s) {
    setSnippets(snips => [s, ...snips])
  }

  async function deleteSnippet(id) {
    const response = await fetch("/api/snippets/" + id, {
      method: "DELETE"
    })
    const json = await response.json()
    setSnippets(snips => snips.filter(s => s._id !== json.id))
  }

  async function editSnippet(snippet) {
    const response = await fetch("/api/snippets/" + snippet._id, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(snippet)
    })
    const editedSnippet = await response.json()
    setSnippets(snips => snips.map(s => s._id === editedSnippet._id
      ? editedSnippet
      : s))
  }

  return (
    <>
      <EditSnippetDialog activeSnippet={editingSnippet} onClose={() => setEditingSnippet(null)} editSnippet={editSnippet} />
      <SnippetForm pushSnippet={pushSnippet}></SnippetForm>
      <LanguageSelect language={language} setLanguage={setLanguage}></LanguageSelect>
      {snippets.map(s => (
        <SnippetCard
          key={s._id}
          snippet={s}
          deleteSnippet={() => deleteSnippet(s._id)}
          startEditing={() => setEditingSnippet(s)}
        >
        </SnippetCard>))}
    </>
  )
}

export default App
