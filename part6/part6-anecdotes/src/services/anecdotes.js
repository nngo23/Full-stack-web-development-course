const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

  const list = await response.json()

  return list
}

const createNew = async (content) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, votes: 0 }),
  })
  
  if (!response.ok) {
    throw new Error('Failed to create anecdote')
  }
  
  return await response.json()
}

const increaseVote = async (anecdote) => {
  const response = await fetch(`${url}/${anecdote.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...anecdote, votes: anecdote.votes + 1 }),
  })

  if (!response.ok) {
    throw new Error('Failed to update vote')
  }
  
  return await response.json()
}

export default { getAll, createNew, increaseVote }