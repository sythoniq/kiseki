import { useState } from 'react'
import toast from 'react-hot-toast'
import styles from './login.module.css'

export default function Login() {
	const API = import.meta.env.VITE_BASE_API
	const [ username, setUsername ] = useState()
	const [ password, setPassword ] = useState()


	async function handleLogin(e) {
		e.preventDefault()
		try {
			if (!username) {
				return toast.error("Username not provided!")
			}

			if (username.length < 3) {
				return toast.error("Username must be more than 3 characters")
			} 

			if (!password) {
				return toast.error("Password not provided!")
			}

			const res = await fetch(`${API}/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({username, password})
			})	
			const data = await res.json()
			if (data.success != true) {
				return toast.error(`${data.message}`)
			}
			localStorage.setItem("jwt-token", data.token)
			window.location.href = "/"
			return;
		} catch(e) {
			return toast.error("Something went wrong.")
		}
	}

	return (
		<main className={styles.loginPage}>
			<h2>Login</h2>
			<form onSubmit={handleLogin} className={styles.loginForm}>
				<div>
					<label>Username</label>
					<input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
				</div>
				<div>
					<label>Password</label>
					<input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
				</div>

				<button>Login</button>
			</form>
			<span className={styles.splitLine}></span>
			<span>Don't have an account? <Link to="/register">Sign up</Link></span>
		</main>
	)
}
