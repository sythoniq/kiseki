import { Link } from 'react-router'

export default function Nav({loggedIn, logout}) {
  return (
    <nav className="nav-links">
      <Link to="/"><button className="home-btn">Kiseki</button></Link>
      {loggedIn ? (
        <div className="options">
          <Link to="/"><button>Posts</button></Link>
          <Link to="/"><button onClick={logout}>Logout</button></Link>
        </div>
      ) : (
        <div className="options">
          <Link to="/register"><button>Register</button></Link>    
          <Link to="/login"><button>Login</button></Link>
        </div>
      )} 
    </nav>
  )
}
