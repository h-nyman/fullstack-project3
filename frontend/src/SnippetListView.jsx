import { useState } from 'react'
import './App.css'
import SnippetCard from './SnippetCard'
import LanguageSelect from './LanguageSelect'
import EditSnippetDialog from './EditSnippetDialog'
import { useFetch } from './useFetch'
import { useLazyFetch } from './useLazyFetch'

export default function SnippetListView() {
  const [language, setLanguage] = useState("")
  const { data: snippets, loading: snippetsLoading, error: snippetsError, refetch } = useFetch('/api/snippets?lang=' + language);
  const [editingSnippet, setEditingSnippet] = useState(null)
  const { loading: deleteLoading, error: deleteError, refetch: deleteSnipFetch } = useLazyFetch();
  const { loading: editLoading, error: editError, refetch: editSnipFetch } = useLazyFetch();

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

  return (
    <>
      <div className="card">
        <h1>Code Snippet Library</h1>

        {(snippetsLoading || deleteLoading || editLoading) && (
          <p className="loading">Loading...</p>
        )}

        {(snippetsError || deleteError || editError) && (
          <p className="error">
            {snippetsError || deleteError || editError}
          </p>
        )}

        <EditSnippetDialog
          activeSnippet={editingSnippet}
          onClose={() => setEditingSnippet(null)}
          editSnippet={editSnippet}
        />

        <LanguageSelect language={language} setLanguage={setLanguage} />
      </div>

      {!snippetsLoading && !snippetsError && snippets && snippets.length > 0 && (
        snippets.map(s => (
          <SnippetCard
            className="card"
            key={s._id}
            snippet={s}
            deleteSnippet={() => deleteSnippet(s._id)}
            startEditing={() => setEditingSnippet(s)}
          />
        ))
      )}
    </>
  );
}
