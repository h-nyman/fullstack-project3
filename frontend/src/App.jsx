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

  return (
    <>
      <EditSnippetDialog activeSnippet={editingSnippet} onClose={() => setEditingSnippet(null)} />
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
