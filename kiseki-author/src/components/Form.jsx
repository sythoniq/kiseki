import { Link, useNavigate } from 'react-router'

export default function Form(props) {
  const API = import.meta.env.VITE_BASE_API_URL;
  const navigate = useNavigate()

  async function handleLogin(e) {
    const res = await fetch(API+'/login');
    const data = await res.json() 
  }

  async function handleRegister(e) {
    const res = await fetch(API+'/login');
    const data = await res.json()
    console.log(data);    
  }

  return (
    <main className="form-page">
      {props.login ? (
      <>
      <Link to="/"><button>Home</button></Link>
      <form className="login-form">
        <h2> Login </h2>
        <label htmlFor="username"></label>
        <input type="text" name="username" placeholder="Username" />
        <label htmlFor="password"></label>
        <input type="password" name="password" placeholder="Password" />

        <button className="login-button" onClick={handleLogin}>Login</button>
      </form>
      </>
      ) : (
      <>
      <Link to="/"><button>Home</button></Link>
      <form className="register-form">
        <h2> Sign Up </h2>
        <label htmlFor="username"></label>
        <input type="text" name="username" placeholder="Username" />
        <label htmlFor="password"></label>
        <input type="password" name="password" placeholder="Password" />

        <button className="register-button" onClick={handleRegister}>Register</button>
      </form>
      </>
      )}
    </main>
  )
}
