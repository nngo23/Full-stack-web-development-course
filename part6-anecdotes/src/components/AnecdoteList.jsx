import { useDispatch, useSelector } from 'react-redux'
import { voteOf }  from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <p>
      {anecdote.content} has {anecdote.votes} 
      <button onClick={() => handleVote(anecdote.id)}>vote</button> 
    </p>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({anecdotes, filter}) => {
    return anecdotes
      .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
      .sort((x, y) => y.votes - x.votes)
  })

  const handleVote = id => {
    dispatch(voteOf(id))
  } 

  return (
    <ul>
    {anecdotes.map(anecdote => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={handleVote}
        />
      ))}
    </ul>
  )
}

export default AnecdoteList


