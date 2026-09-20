import styles from "./content.module.css"
import toast from 'react-hot-toast'
import { useParams, Link } from 'react-router'
import { useState } from 'react'

import useGetPost from '../../../hooks/useGetPost.js'

export default function PostPage() {
	const API = import.meta.env.VITE_BASE_API
	const TOKEN = localStorage.getItem("jwt-token")

	const postId = useParams().postId
	const [post, loading, error] = useGetPost(postId)
	const [postState, setPostState] = useState()

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

	async function handlePublish() {
		try {
			const res = await fetch(`${API}/posts/${postId}/publish`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					"Authorization": TOKEN
				}
			})
			const data = await res.json()
			if (!data.success) {
				toast.error(data.message)
				return;
			}

			toast.success("Published")
			setPostState(true)
		} catch(e) {
			return toast.error("Something went wrong")
		}
	}
	
	async function handleUnpublish() {
		try {
			const res = await fetch(`${API}/posts/${postId}/unpublish`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					"Authorization": TOKEN
				}
			})
			const data = await res.json()
			if (!data.success) {
				toast.error(data.message)
				return;
			}

			toast.success("Unpublished!")
			setPostState(false)
		} catch(e) { 
			return toast.error("Something went wrong")
		}
	}
	return (
		<section className={styles.content}>
			<main className={styles.post}>
				<div className={styles.postDetails}>
					<Link to="/author"><button className={styles.backBtn}>Back</button></Link>
					<div>
						<span className={styles.postDate}>
							{new Date(post.uploadedAt).toLocaleDateString(undefined,
								{year: "numeric", month: "long", day: "numeric" }
							)}
						</span>	
						<span className={styles.postCateg}>{post.post_category}</span>
						<div className={styles.postState}>
							{post.published || postState ? (
								<button className={styles.unpubBtn} onClick={handleUnpublish}>Unpublish</button>
							) : (
									<button className={styles.pubBtn} onClick={handlePublish}>Publish</button>
								)}
						</div>
					</div>
					<h2>{post.post_title}</h2>
				</div>
				<div className={styles.postBody} dangerouslySetInnerHTML={{ __html: post.post_content}}>
				</div>
			</main>
		</section>
	)
}
