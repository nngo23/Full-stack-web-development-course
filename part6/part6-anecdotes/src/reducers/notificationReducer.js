import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    show(state, action) {
      return action.payload
    },  
    remove() {
      return null
    }
  }    
})

export const { show, remove } = notificationSlice.actions

export const setNotification = (message, timeOutinSecs) => {
    return dispatch => {
        dispatch(show(message))

        setTimeout(() => {
          dispatch(remove())
        }, timeOutinSecs * 1000)
    }
}

export default notificationSlice.reducer

