import { useNavigate, Link } from 'react-router'
import styles from './sidebar.module.css'

import useGetPosts from '../../hooks/useGetPosts.js'

export default function Sidebar(props) {
	const navigate = useNavigate()
	const user = props.userObj;
	const [ posts, postCategories, loading, error ] = useGetPosts()

	function handleLogin(e) {
		e.preventDefault()
		navigate("/login")
	}

	function handleLogout(e) {
		e.preventDefault()
		const token = localStorage.getItem('jwt-token')
		if (!token) {
			return;
		}

		localStorage.removeItem('jwt-token')
		return props.userSet(null)
	}

	if (loading) {
		return (
			<span className="loader"></span>
		)
	}

	if (error) {
		return (
			<div className="error">
				<p>{error}</p>
			</div>
		)
	}

	const categList = postCategories.map(categ => 
		<div key={postCategories.indexOf(categ)}>{categ}</div>	
	)

	return (
		<header className={styles.sidebar}>
			<div>
				<Link to="/"><h1>Kiseki</h1></Link>
				<p>Random guides and linux stuff as well</p>
			</div>
			<main className={styles.categories}>
				{categList}	
			</main>
			<div className={styles.user}>
				{ user ? (
					<div className={styles.loggedIn}>
						<span>{user.user_name}</span>
						<span><button onClick={handleLogout}>Logout</button></span>
					</div>
				) : (
						<div className={styles.logIn}>
							<span><button onClick={handleLogin}>Login</button></span>
						</div>
					)}
			</div>
		</header>
	)
}
