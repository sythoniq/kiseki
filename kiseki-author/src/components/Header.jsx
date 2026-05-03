import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'

export default function Header() {
  const API = import.meta.env.VITE_BASE_API_URL
  const token = localStorage.getItem("jwt-token")

  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useState(false)
  
  async function authorize() {
    const res = await fetch(API+'/author', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    })
    const data = await res.json()
    if (data.success) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
      return data.msg;
    }
  }

  function logout(e) {
    e.preventDefault()
    if (token) {
      localStorage.removeItem("jwt-token")
      setLoggedIn(false)
      navigate("/login") 
    } else {
      setLoggedIn(false)
      navigate("/login")
    }
  }

  useEffect(() => {
    authorize()
  }, [API])

  return (
    <nav className="header-nav">
      <Link to="/"><button>Kiseki</button></Link>
      {loggedIn ? (
        <>
        <Link to="/create"><button>New Post</button></Link>
        <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
        <Link to="/register"><button>Register</button></Link>
        <Link to="/login"><button>Login</button></Link>
        </>
      )}
    </nav>
  )
}
