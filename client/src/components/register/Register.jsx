import styles from './register.module.css'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useNavigate } from 'react-router'

export default function Register() {
	const API = import.meta.env.VITE_BASE_API
	const navigate = useNavigate()
	const [ username, setUsername ] = useState()
	const [ password, setPassword ] = useState()

	async function handleRegister(e) {
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

			if (password.length < 8) {
				return toast.error("Password must be 8 characters or more")
			}

			const res = await fetch(`${API}/register`, {
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
			toast.success("Success..")
			return navigate("/login")
		} catch(e) {
			return toast.error(e.message)
		}
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
			<span>Already have an account?<a href="/login">Sign in</a></span>
		</main>
	)
}
