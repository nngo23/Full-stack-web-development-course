import { useDispatch } from 'react-redux'

import { insertAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async(event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        
        dispatch(insertAnecdote(content))
        dispatch(setNotification(`You created '${content}'`, 5))
    }

return (
    <div>
    <h2>Create new</h2>
        <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote"/>
        </div>
          <button type="submit">create</button>
        </form>
    </div>
  )
}

export default AnecdoteForm