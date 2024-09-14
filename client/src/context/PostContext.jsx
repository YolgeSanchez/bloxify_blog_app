import { createContext, useContext } from 'react'

export const PostContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const usePost = () => {
  const context = useContext(PostContext)
  if (!context) {
    throw new Error('usePost must be used within a PostContextProvider')
  }
  return context
}

const PostContextProvider = ({ children }) => {
  return <PostContext.Provider value={{}}>{children}</PostContext.Provider>
}

export default PostContextProvider
