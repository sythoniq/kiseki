import { useState, useEffect } from 'react'

import Nav from './components/Nav.jsx'
import Posts from './components/Posts.jsx'

export default function App() {
  const API = import.meta.env.VITE_BASE_API_URL
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    async function authorize() {
      const token = localStorage.getItem("jwt-token")
      if (token) {
        const result = await fetch(API+"/auth", {
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
  }, [loggedIn]);

  function logout() {
    try {
      localStorage.removeItem("jwt-token")
      setLoggedIn(false);
    } catch(err) {
      console.error(err)
    }
  }

  return (
    <>
      <Nav loggedIn={loggedIn} logout={logout}/>
    </>
  )
}

