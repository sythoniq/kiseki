import { useState, useEffect } from 'react'
import { Outlet } from 'react-router'

import Nav from './components/Nav.jsx'
import Posts from './components/Posts.jsx'
import './public/index.css'

export default function App() {
  const API = import.meta.env.VITE_BASE_API_URL
  const [user, setUser] = useState(null)
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
          setUser(data.user)
          return setLoggedIn(true)
        } else {
          setUser(null)
          return setLoggedIn(false)
        }
      } else {
        setUser(null)
        return setLoggedIn(false)
      }
    }
   
      authorize()
  }, [API]);

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
      <Outlet context={{loggedIn, user}}/>
    </>
  )
}

