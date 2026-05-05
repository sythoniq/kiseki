import { useState } from 'react'
import { Link } from 'react-router'

export default function Login() {
  const API = import.meta.env.VITE_BASE_API_URL;

  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  async function handleLogin(e) {
    e.preventDefault()
  
    const res = await fetch(API+'/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username, password})
    });
    const data = await res.json()

    if (data.success) {
      localStorage.setItem("jwt-token", data.token) 
    } else {
      throw new Error("Login failed")
    }
  }
  
  return (
    <main className="login-form">
      <Link to="/"><button>Home</button></Link>
      <form>
        <label htmlFor="username"></label>
        <input type="text" id="username" name="username" placeholder="Username"
        onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="password"></label>
        <input type="password"  id="password" name="password"
placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>

        <button onClick={handleLogin}>Login</button>
      </form>
    </main>
  )
}
