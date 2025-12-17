import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    voteOf(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      if (anecdoteToChange) {
        anecdoteToChange.votes = anecdoteToChange.votes + 1
      }
    },
    showAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, voteOf, showAnecdotes } = anecdoteSlice.actions


export default anecdoteSlice.reducer

