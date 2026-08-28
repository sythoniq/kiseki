import { useState } from 'react'
import { useParams } from 'react-router'
import toast from 'react-hot-toast'
import styles from './post.module.css'
import useGetPost from '../../hooks/useGetPost.js'

export default function Post() {
	const API = import.meta.env.VITE_BASE_API
	const postId = Number(useParams().postId)
	const [ post, postComments, loading, error ] = useGetPost(postId)
	const [ comment, setComment ] = useState()

	if (loading) {
		return (
			<span className="loader"></span>
		)
	}

	if (error) {
		return (
			<span>error</span>
		)
	}

	async function handleComment(e) {
		e.preventDefault()

		try {
			if (!comment) {
				return toast.error("Comment is empty!")
			}

			const res = await fetch(`${API}/posts/${postId}/comment`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": localStorage.getItem("jwt-token")
				},
				body: JSON.stringify({content: comment})
			})

			const data = await res.json()

			if (data.success != true) {
				if (res.status == 500) {
					return toast.error("Server error")
				}
				return toast.error(data.message)
			}
			return toast.success("Comment success")
		} catch (e) {
			return toast.error(e)
		}
	}

	console.log(postComments)
	const commentList = postComments.map((comment) => 
		<div key={comment.comment_id} className={styles.commentCard}>
			<span>{comment.comment_content}</span>
		</div>
	)

	return (
		<section className={styles.postPage}>
			<main className={styles.post}>
				<div className={styles.postDetails}>
					<div>
						<span className={styles.postDate}>
							{new Date(post.uploadedAt).toLocaleDateString(undefined,
								{year: "numeric", month: "long", day: "numeric" }
							)}
						</span>	
						<span className={styles.postCateg}>{post.post_category}</span>
					</div>
					<h2>{post.post_title}</h2>
				</div>
				<div className={styles.postBody}>
					{post.post_content}
				</div>
			</main>
			<section className={styles.commentSection}>
				<h2>Comments</h2>
				<form className={styles.commentForm}>
					<div>
						<label htmlFor="comment"></label>
						<input type="text" name="comment" placeholder="Comment" onChange={(e) => setComment(e.target.value)} />
					</div>
					<button onClick={handleComment}>Comment</button>
				</form>
				<div className={styles.comments}>
					{commentList}
				</div>
			</section>
		</section>
	)
}
