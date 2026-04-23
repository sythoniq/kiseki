import { Link } from 'react-router'

export default function Nav({loggedIn, logout}) {
  return (
    <nav className="nav-links">
      <Link to="/"><button>Home</button></Link>
      {loggedIn ? (
        <>
          <Link to="/"><button>About</button></Link>
          <Link to="/"><button onClick={logout}>Logout</button></Link>
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
