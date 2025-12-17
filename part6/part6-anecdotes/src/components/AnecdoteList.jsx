import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { addVote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <p>
      {anecdote.content} has {anecdote.votes} 
      <button onClick={() => handleVote(anecdote)}>vote</button> 
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

  const handleVote = anecdote => {
    dispatch(addVote(anecdote))
    dispatch(setNotification(`You voted '${anecdote.content}'`, 5))
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


