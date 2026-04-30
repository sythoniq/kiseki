import { Link } from 'react-router'

export default function Header({authorized}) {
  return (
    <header className="nav-bar">
      <Link to="/"><button className="home-btn">Kiseki</button></Link>
        {authorized ? (
        <div className="extra-nav">
          <Link to="/"><button>Posts</button></Link>
          <Link to="/logout"><button>Logout</button></Link>
        </div>
        ) : (
        <div className="extra-nav">
          <Link to="/login"><button>Login</button></Link>
          <Link to="/register"><button>Register</button></Link>
        </div>
        )}
    </header>
  )
}
