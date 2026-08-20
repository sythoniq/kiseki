import { useState, useEffect } from 'react'
import styles from './sidebar.module.css'

import useGetPosts from '../../hooks/useGetPosts.js'

export default function Sidebar() {
	const [ posts, postCategories, isLoading, isError ] = useGetPosts()
	if (isLoading) {
		return (
			<>
				<h1>Kiseki</h1>
				<p>Random linux fixes and guides storehouse</p>
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
			<p>Random linux fixes and guides storehouse</p>
			<main className={styles.categories}>
				{categList}	
			</main>
			<div className={styles.user}>
				<span>Logout/Login/User details</span>
			</div>
		</header>
	)
}
