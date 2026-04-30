import { useState } from 'react'
import { Link, useNavigate } from 'react-router'

export default function Register() {
  const API = import.meta.env.VITE_BASE_API_URL
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  async function handleRegister(e) {
    e.preventDefault()
    try {
      const response = await fetch(API+"/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password})
      })
      const data = await response.json()
      console.log(data);
      if (data.success) {
        navigate("/login")
      } else {  
        throw new Error(data.msg)
      }
    } catch(err) {
      console.error(err)
    }
  }

  return (
    <main className="register-page">
      <Link to="/"><div className="home-btn"><button>Home</button></div></Link>
      <form className="register-form">
        <h2>Sign Up</h2>
        <label htmlFor="username"></label>
        <input type="text" name="username" id="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
        <label htmlFor="password"></label>
        <input type="password" name="password" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>

        <button onClick={handleRegister}>Register</button>
      </form>
    </main>
  )
}
