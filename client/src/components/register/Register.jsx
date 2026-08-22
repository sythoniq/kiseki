import styles from './register.module.css'
import { useState } from 'react'
import { useNavigate } from 'react-router'

export default function register() {
	const API = import.meta.env.VITE_BASE_API
	const navigate = useNavigate()
	const [ username, setUsername ] = useState()
	const [ password, setPassword ] = useState()
	const [ error, setError ] = useState(null)

	async function handleRegister(e) {
		e.preventDefault()
		try {
			if (!username || !password) {
				return;
			}
			const res = await fetch(`${API}/register`, {
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
			navigate("/login")
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
		<main className={styles.registerPage}>
			<h2>Register</h2>
			<form className={styles.registerForm}>
				<div>
					<label>Username</label>
					<input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
				</div>
				<div>
					<label>Password</label>
					<input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
				</div>

				<button onClick={handleRegister}>Sign up</button>
			</form>
			<span className={styles.splitLine}></span>
			<span>Already have an account?<a href="/register">Sign in</a></span>
		</main>
	)
}
