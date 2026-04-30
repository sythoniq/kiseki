import { useState, useEffect } from 'react'
import { useLoaderData, Outlet } from 'react-router'

import Header from './components/Header.jsx'
import Post from './components/Post.jsx'

function App() {
  const API = import.meta.env.VITE_BASE_API_URL
  const [loggedIn, setLoggedIn] = useState(false)
  const posts = useLoaderData()
  
  useEffect(() => {
    async function authorize() {
      const token = localStorage.getItem("jwt-token")
      if (token) {
        const result = await fetch(API+"/author", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token
          }
        });   
        const data = await result.json()
        if (data.success) {
          return setLoggedIn(true)
        } else {
          return setLoggedIn(false)
        }
      } else {
        return setLoggedIn(false)
      }
    }
   
    return () => {
      authorize()
    }
  }, [API])

  return (
    <>
      <Header authorized={loggedIn}/>
      <main className="main-content">
        {posts && posts.map((post) => {
          return (
            <Post key={post.id} title={post.title} uploadedAt={post.uploadedAt} published={post.published} />
          )
        })} 
      </main>
    </>
  )
}

export default App
