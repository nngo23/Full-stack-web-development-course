const url = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }
  return await response.json()
}

export const createAnecdote = async (newAnecdote) => {
  const alternatives = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAnecdote)
  }

  const response = await fetch(url, alternatives)

  if (!response.ok) {
    throw new Error('Failed to create an anecdote')
  }
 
  return await response.json()
}

export const updateAnecdote = async (updatedAnecdote) => {
  const alternatives = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedAnecdote)
  }

  const response = await fetch(`${url}/${updatedAnecdote.id}`, alternatives)

  if (!response.ok) {
    throw new Error('Failed to update anecdote')
  }

  return await response.json()
}


