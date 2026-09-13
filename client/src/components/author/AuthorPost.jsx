import styles from './post.module.css'

import { useParams } from 'react-router'
import toast from 'react-hot-toast'

import useGetPost from '../../hooks/useGetPost.js'

export default function AuthorPost() {
	const postId = useParams().postId

	const [post, loading, error] = useGetPost(postId)

	if (loading) {
		return (
			<span className="loader"></span>
		)
	}

	if (error) {
		return (
			<div className="error">{error}</div>
		)
	}

	function handlePublish() {
		try {
			// TODO 
		}	catch(e) {
			return toast.error("Something went wrong.")
		}
	}

	function handleUnpublish() {
		try {
			// TODO
		} catch(e) {
			return toast.error("Something went wrong.")
		}
	}

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
			{!post.published ? (
				<div>
					<button className={styles.publishBtn} onClick={handlePublish}>Publish</button>
				</div>
			) : (
					<div>
						<button className={styles.unpublishBtn} onClick={handleUnpublish}>Unpublish</button>
					</div>
				)}
		</section>
	)
}
