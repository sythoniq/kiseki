import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router'
import toast from 'react-hot-toast'
import styles from './sidebar.module.css'

import useGetPosts from '../../hooks/useGetPosts.js'
import useGetUser from '../../hooks/useGetUser.js'

export default function Sidebar(props) {
	const navigate = useNavigate()
	const user = props.user;
	const [ posts, postCategories, isLoading, isError ] = useGetPosts()

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
		navigate("/login")
		return;
	}

	if (isLoading) {
		return (
			<span className="loader"></span>
		)
	}

	if (isError) {
		return toast.error(`${isError}`)	
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
				{ props.user ? (
					<div className={styles.loggedIn}>
						<span>{props.user.user_name}</span>
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
