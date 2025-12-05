import { useState } from 'react'
import './App.css'
import SnippetCard from './SnippetCard'
import LanguageSelect from './LanguageSelect'
import SnippetForm from './SnippetForm'
import EditSnippetDialog from './EditSnippetDialog'
import { useFetch } from './useFetch'
import { useLazyFetch } from './useLazyFetch'

function App() {
  const [language, setLanguage] = useState("")
  const { data: snippets, loading: snippetsLoading, error: snippetsError, refetch } = useFetch('/api/snippets?lang=' + language);
  const [editingSnippet, setEditingSnippet] = useState(null)
  const { loading: deleteLoading, error: deleteError, refetch: deleteSnipFetch } = useLazyFetch();
  const { loading: editLoading, error: editError, refetch: editSnipFetch } = useLazyFetch();
  const { loading: createLoading, error: createError, refetch: createSnipFetch } = useLazyFetch();
  

  async function deleteSnippet(id) {
    await deleteSnipFetch("/api/snippets/" + id, { method: "DELETE" })
    refetch()
  }

  async function editSnippet(snippet) {
    await editSnipFetch("/api/snippets/" + snippet._id, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(snippet)
    })
    refetch()
  }

  async function createSnippet(snippet) {
    await createSnipFetch("/api/snippets", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(snippet)
        })
        refetch()
      }

  return (
    <>
      <h1>Code Snippet Library</h1>
      {(snippetsLoading || deleteLoading || editLoading || createLoading) && (
        <p style={{ color: 'gray' }}>Loading...</p>
      )}

      {(snippetsError || deleteError || editError || createError) && (
        <p style={{ color: 'red' }}>
          {snippetsError || deleteError || editError || createError}
        </p>
      )}
      <EditSnippetDialog activeSnippet={editingSnippet} onClose={() => setEditingSnippet(null)} editSnippet={editSnippet} />
      <SnippetForm createSnippet={createSnippet} />
      <LanguageSelect language={language} setLanguage={setLanguage} />

      {!snippetsLoading && !snippetsError && snippets && snippets.length > 0 && (
        snippets.map(s => (
          <SnippetCard
            key={s._id}
            snippet={s}
            deleteSnippet={() => deleteSnippet(s._id)}
            startEditing={() => setEditingSnippet(s)}
          />
        ))
      )}
    </>
  )
}

export default App
