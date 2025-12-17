import { useDispatch, useSelector } from 'react-redux'
import { voteOf } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

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
    const voted = anecdotes.find(a => a.id === id)
    dispatch(voteOf(id))
    dispatch(setNotification(`You voted '${voted.content}'`, 5))
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


