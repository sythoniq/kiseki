import styles from './index.module.css'
import useGetAllPosts from '../../../hooks/useGetAllPosts.js'

import { Link } from 'react-router'

export default function Index() {
	const [ posts, loading, error] = useGetAllPosts()

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

	const postsList = posts.map(post => 
		<section key={post.post_id} className={styles.postCard}>
			<Link to={`/author/posts/${post.post_id}`}><h2>{post.post_title}</h2></Link>
			<div className={styles.postDate}>{new Date(post.uploadedAt).toLocaleDateString(undefined, {year: "numeric", month: "long", day: "numeric"})}</div>
			<div className={styles.categoryTag}>{post.post_category}</div>
		</section>
	)


	return (
		<main className={styles.allPosts}>
			{postsList}	
		</main>
	)
}
