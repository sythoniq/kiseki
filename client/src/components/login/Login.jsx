import { useState } from 'react'
import styles from './login.module.css'

export default function Login() {
	const API = import.meta.env.VITE_BASE_API
	const [ username, setUsername ] = useState()
	const [ password, setPassword ] = useState()
	const [ error, setError ] = useState(null)

	async function handleLogin() {
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
			<span>Login</span>
			<form className={styles.loginForm}>
				<div>
					<label>Username</label>
					<input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
				</div>
				<div>
					<label>Password</label>
					<input type="password" onChange={(e) => setPassword(e.target.value)} />
				</div>

				<button onClick={handleLogin}>Login</button>
			</form>
			<span>Don't have an account?<a href="/register">Sign up</a></span>
		</main>
	)
}
