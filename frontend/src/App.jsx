import { useEffect, useState } from 'react'
import './App.css'
import SnippetCard from './SnippetCard'
import LanguageSelect from './LanguageSelect'
import SnippetForm from './SnippetForm'
import EditSnippetDialog from './EditSnippetDialog'
import { useFetch } from './useFetch'

async function fetchSnippets(language) {
  const response = await fetch('/api/snippets?lang=' + language)
  return response.json()
}

function App() {
  const [language, setLanguage] = useState("")
  const { data: snippets, loading: snippetsLoading, error: snippetsError, refetch } = useFetch('/api/snippets?lang=' + language);
  const [editingSnippet, setEditingSnippet] = useState(null)

  async function deleteSnippet(id) {
    const response = await fetch("/api/snippets/" + id, {
      method: "DELETE"
    })
    const json = await response.json()
    refetch()
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
    refetch()
  }

  return (
    <>
      <h1>Code Snippet Library</h1>
      <EditSnippetDialog activeSnippet={editingSnippet} onClose={() => setEditingSnippet(null)} editSnippet={editSnippet} />
      <SnippetForm pushSnippet={undefined}></SnippetForm>
      <LanguageSelect language={language} setLanguage={setLanguage}></LanguageSelect>
      {snippets && snippets.map(s => (
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
