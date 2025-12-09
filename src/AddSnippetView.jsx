import './App.css'
import SnippetForm from './SnippetForm'
import { useLazyFetch } from './useLazyFetch'
import { useNavigate } from "react-router-dom";

export default function AddSnippetView() {
  const { loading: createLoading, error: createError, refetch: createSnipFetch } = useLazyFetch();
  const navigate = useNavigate();
  async function createSnippet(snippet) {
    await createSnipFetch("/api/snippets", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(snippet)
    })
    navigate('/')
  }

  return (
    <>
      <div className="card">
        <h1>Add New Snippet</h1>

        {(createLoading) && (
          <p className="loading">Loading...</p>
        )}

        {(createError) && (
          <p className="error">
            {createError}
          </p>
        )}

        <SnippetForm createSnippet={createSnippet} />
      </div>
    </>
  );
}