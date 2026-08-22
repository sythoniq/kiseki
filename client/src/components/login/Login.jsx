import { useState } from 'react'
import { useNavigate } from 'react-router'
import styles from './login.module.css'

export default function Login() {
	const API = import.meta.env.VITE_BASE_API
	const navigate = useNavigate()
	const [ username, setUsername ] = useState()
	const [ password, setPassword ] = useState()
	const [ error, setError ] = useState(null)

	async function handleLogin(e) {
		e.preventDefault()
		try {
			if (!username || !password) {
				return;
			}
			const res = await fetch(`${API}/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({username, password})
			})	
			if (!res.ok) {
				setError("Server error")
			}
			const data = await res.json()
			if (data.success != true) {
				setError(data.error)
			}
			localStorage.setItem("jwt-token", data.token)
			navigate("/")
			return;
		} catch(e) {
			setError(e.message)
		}
	}

	if (error) {
		console.error(error)
		return (
			<div>Error check logs</div>
		)
	}

	return (
		<main className={styles.loginPage}>
			<h2>Login</h2>
			<form className={styles.loginForm}>
				<div>
					<label>Username</label>
					<input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
				</div>
				<div>
					<label>Password</label>
					<input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
				</div>

				<button onClick={handleLogin}>Login</button>
			</form>
			<span className={styles.splitLine}></span>
			<span>Don't have an account?<a href="/register">Sign up</a></span>
		</main>
	)
}
