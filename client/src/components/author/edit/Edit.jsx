import { useState, useRef } from 'react'
import { useNavigate, Link, useParams } from 'react-router'
import { Editor } from '@tinymce/tinymce-react'
import toast from 'react-hot-toast'
import styles from './edit.module.css'
import useGetPost from '../../../hooks/useGetPost.js'

export default function Edit() {
	const API=import.meta.env.VITE_BASE_API
	const TINY_API=import.meta.env.VITE_TINY_API
	const TOKEN = localStorage.getItem('jwt-token')
	const navigate = useNavigate()
	
	const { postId } = useParams()
	const editorRef = useRef(null)
	const [ post, loading, error ] = useGetPost(postId)	

	if (loading) {
		return (
			<span className="loader"></span>
		)
	}

	if (error) {
		return (
			<div className="error">
				<span>{error}</span>
			</div>
		)
	}

	async function handlePostUpdate(e) {
		e.preventDefault()
		try {
			const formData = new FormData(e.target)
			const postTitle = formData.get("title")
			const postContent = editorRef.current.getContent()
			const postCategory = formData.get("category")

			const res = await fetch(`${API}/posts/${postId}/update`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					"Authorization": TOKEN
				},
				body: JSON.stringify({title: postTitle, content: postContent, category: postCategory})
			})
			const data = await res.json()

			if (!data.success) {
				return toast.error(data.message)
			}

			toast.success("Post updated...")
			return navigate(`/author/posts/${postId}`)
		} catch(e) {
			return toast.error(e.message)
		}
	}

	return (
		<main className={styles.editPost}>
			<div className={styles.pageTop}>
				<Link to={`/author/posts/${postId}`}><button>Back</button></Link>
				<h2>Edit Post</h2>
			</div>
			<form className={styles.postForm} onSubmit={handlePostUpdate}>
				<section className={styles.postTop}>
					<div>
						<label htmlFor="title">Title</label>
						<input name="title" id="title" defaultValue={post.post_title} />
					</div>
					<div>
						<label htmlFor="category">Category</label>
						<input name="category" id="category" defaultValue={post.post_category} />
					</div>
				</section>
				<Editor
					apiKey={TINY_API}
					onInit={(_evt, editor) => (editorRef.current = editor)}
					initialValue={post.post_content}
					init={{
						height: "100%",
						menubar: false,
						skin: "oxide-dark",

						content_css: "dark",
						plugins: [
							"advlist",
							"autolink",
							"lists",
							"link",
							"image",
							"charmap",
							"anchor",
							"codesample",
							"media",
							"wordcount",
							"autoresize"
						],
						toolbar:
						"undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist | codesample image",
						content_style:
						"body { font-family:Helvetica,Arial,sans-serif; font-size:1rem; background-color:#2a323c;color:white;  }",
						min_height: 300,
						autoresize_bottom_margin: 20,
						autoresize_overflow_padding: 10,
						statusbar: false,
					}}
				/>
				<button>Save</button>
			</form>
		</main>

	)
}
