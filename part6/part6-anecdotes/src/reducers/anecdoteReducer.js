import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    voteOf(state, action) {
      const updated = action.payload
      return state.map(a =>
        a.id === updated.id ? updated : a
      )
    },
    showAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, voteOf, showAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(showAnecdotes(anecdotes))
  }
}

export const insertAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const addVote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.increaseVote(anecdote)
    dispatch(voteOf(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer

