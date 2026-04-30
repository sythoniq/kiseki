import { useState } from 'react'
import { Link, useNavigate } from 'react-router'

export default function Form(props) {
  const API = import.meta.env.VITE_BASE_API_URL;
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()
    const res = await fetch(API+'/login', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({username, password})
    });
    const data = await res.json() 
    if (data.success) {
      localStorage.setItem("jwt-token", data.token)
      navigate("/");
    } else {
      throw new Error("Login failed");
    }
  }

  async function handleRegister(e) {
    e.preventDefault()
    const res = await fetch(API+'/login', {
      method: "POST",
      headers: "Content-Type: application/json",
      body: JSON.stringify({username, password})
    });
    const data = await res.json()
    if (data.success) {
      navigate("/login")
    } else {
      throw new Error("Register failed")
    }
  }

  return (
    <main className="form-page">
      {props.login ? (
      <>
      <Link to="/"><button>Home</button></Link>
      <form className="login-form">
        <h2> Login </h2>
        <label htmlFor="username"></label>
        <input type="text" id="username" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="password"></label>
        <input type="password" name="password" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>

        <button className="login-button" onClick={handleLogin}>Login</button>
      </form>
      </>
      ) : (
      <>
      <Link to="/"><button>Home</button></Link>
      <form className="register-form">
        <h2> Sign Up </h2>
        <label htmlFor="username"></label>
        <input type="text" id="username" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
        <label htmlFor="password"></label>
        <input type="password" id="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>

        <button className="register-button" onClick={handleRegister}>Register</button>
      </form>
      </>
      )}
    </main>
  )
}
