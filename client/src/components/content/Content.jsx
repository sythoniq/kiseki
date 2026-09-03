import styles from './content.module.css'
import { Link } from 'react-router'
import useGetPosts from '../../hooks/useGetPosts.js'

export default function Content() {
	const [ posts, postCategories, isLoading, isError ] = useGetPosts()
	if (isLoading) {
		return (
			<span className="loader"></span>
		)
	}
	
	if (isError) {
		return (
			<span className="error">{isError}</span>
		)
	}

	const postsList = posts.map(post => 
		<section key={post.post_id} className={styles.postCard}>
			<Link to={`/posts/${post.post_id}`}><h2>{post.post_title}</h2></Link>
			<div className={styles.postDate}>{new Date(post.uploadedAt).toLocaleDateString(undefined, {year: "numeric", month: "long", day: "numeric"})}</div>
			<div className={styles.categoryTag}>{post.post_category}</div>
		</section>
	)

	return (
		<main className={styles.mainContent}>
			{postsList}	
		</main>
	)
}
