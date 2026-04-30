import { useState } from 'react'
import { Link, useNavigate } from 'react-router'

export default function Login() {
  const API = import.meta.env.VITE_BASE_API_URL
  const [username, setUsername] = useState("") 
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault()
    try {
      const response = await fetch(API+"/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password})
      })
      const data = await response.json();
  
      if (data.success) {
        const token = data.token;
        localStorage.setItem("jwt-token", token)  
        navigate("/")
      } else {
        throw(new Error(data.err))
      }
    } catch(err) {
      console.error(err)
    }
  }

  return (
    <main className="login-page">
      <Link to="/"><div className="home-btn"><button>Home</button></div></Link>
      <form className="login-form">
        <h2>Log In</h2>
        <label htmlFor="username"></label>
        <input type="text" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
        <label htmlFor="password"></label>
        <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>

        <button onClick={handleLogin}>Login</button>
      </form>
    </main>
  )
}
