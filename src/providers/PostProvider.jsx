import React, { useReducer } from 'react'
import { PostContext } from '../context'
import { initialState, postReducer } from '../reducers/postReducer'

function PostProvider({children}) {

    const [state, dispatch] = useReducer(postReducer, initialState)
   
  return (
    <PostContext.Provider value={{state,dispatch}}>
        {children}
    </PostContext.Provider>
    
  )
}

export default PostProvider