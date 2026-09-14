import styles from "./content.module.css"
import toast from 'react-hot-toast'
import { useParams } from 'react-router'

import useGetPost from '../../../hooks/useGetPost.js'

export default function PostPage() {
	const postId = useParams().postId

	const [post, loading, error] = useGetPost(postId)

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

	return (
		<section className={styles.content}>
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
		</section>
	)
}
