import { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router'
import toast from 'react-hot-toast'
import styles from './sidebar.module.css'

import useGetPosts from '../../hooks/useGetPosts.js'

export default function Sidebar(props) {
	const API = import.meta.env.VITE_BASE_API
	const TOKEN = localStorage.getItem('jwt-token')
	const navigate = useNavigate()
	const user = props.userObj;
	const [ answer, setAnswer ] = useState('')
	const [ posts, postCategories, loading, error ] = useGetPosts()
	const popupModal = useRef(null)

	function handleLogin(e) {
		e.preventDefault()
		navigate("/login")
	}

	function handleLogout(e) {
		e.preventDefault()
		if (!TOKEN) {
			return;
		}

		localStorage.removeItem('jwt-token')
		return props.userSet(null)
	}

	function popup() {
		const modal = popupModal.current
		if (modal.style.visibility == "visible" || modal.style.visibility == "undefined") {
			return modal.style.visibility = "hidden"
		}
		return modal.style.visibility="visible"
	}

	async function handleAuthorTest(e) {
		e.preventDefault()
		try {
			const res = await fetch(`${API}/role`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": TOKEN
				},
				body: JSON.stringify({answer})
			})
			const data = await res.json()

			if (!data.success) {
				return toast.error(data.message)
			}

			toast.success("Awesome!")
			popupModal.current.style.visibility = "hidden"
			return navigate("/author")
		} catch (e) {
			console.error(e)
			return toast.error("Something went wrong!")	
		}
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
					<>
						{ user.author ? (
							<div className={styles.authorLink}>
								<span>Visit <Link to="/author">author page!</Link></span>
							</div> 
							) : (
								<div className={styles.authorLink}>
									<span>Become an author <button onClick={popup}>here!</button></span>
								</div>
							)
						}	
						<div className={styles.loggedIn}>
							<span>{user.user_name}</span>
							<span><button onClick={handleLogout}>Logout</button></span>
						</div>
					</>
				) : (
						<div className={styles.logIn}>
							<span><button onClick={handleLogin}>Login</button></span>
						</div>
					)}
			</div>

			<div ref={popupModal} className={styles.authorPopup}>
				<h2>Wanna become an author?</h2>
				<p>I have a loop but no eyes, I have a catch but no hands, and I throw things but have no arms. What am I?</p>
				<form onSubmit={handleAuthorTest}>
					<label htmlFor="authorTest">
						<input type="text" id="authorTest" name="authorTest" placeholder="Answer here..." onChange={(e) => setAnswer(e.target.value)}/>
					</label>
					<button>Submit</button>
				</form>
			</div>
		</header>
	)
}
