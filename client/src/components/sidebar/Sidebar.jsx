import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import styles from './sidebar.module.css'

import useGetPosts from '../../hooks/useGetPosts.js'

export default function Sidebar(props) {
	const navigate = useNavigate()
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

		return localStorage.removeItem('jwt-token');
	}

	if (isLoading) {
		return (
			<>
				<h1>Kiseki</h1>
				<p>Small time guide and fixes for things that have interested me...</p>
			</>
		)
	}

	if (isError) {
		return (
			<p>Error</p>
		)
	}

	const categList = postCategories.map(categ => 
		<div key={postCategories.indexOf(categ)}>{categ}</div>	
	)

	return (
		<header className={styles.sidebar}>
			<h1>Kiseki</h1>
			<p>Random guides and linux stuff as well</p>
			<main className={styles.categories}>
				{categList}	
			</main>
			<div className={styles.user}>
				{ props.userObj ? (
					<div className={styles.loggedIn}>
						<span>{props.userObj.user_name}</span>
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
