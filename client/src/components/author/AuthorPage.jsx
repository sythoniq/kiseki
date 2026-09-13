import { Link } from 'react-router'
import styles from './page.module.css'

import useGetAllPosts from '../../hooks/useGetAllPosts.js'

export default function AuthorPage() {
	const [ posts, isLoading, isError ] = useGetAllPosts()
	if (isLoading) {
		return (
			<span className="loader"></span>
		)
	}

	if (isError) {
		return (
			<div className="error">{isError}</div>
		)
	}

	const postsList = posts.map(post => 
		<section key={post.post_id} className={styles.postCard}>
			<Link to={`/author/posts/${post.post_id}`}><h2>{post.post_title}</h2></Link>
			<div className={styles.postDate}>{new Date(post.uploadedAt).toLocaleDateString(undefined, {year: "numeric", month: "long", day: "numeric"})}</div>
			<div className={styles.categoryTag}>{post.post_category}</div>
			{post.published ? (
				<div className={styles.published}>Published</div>
			) : (
				<div className={styles.unpublished}>Not Published</div>
			)}
		</section>
	)

	return (
		<main className={styles.authorPage}>
			<header className={styles.authorHeader}>
				<Link to="/">Kiseki</Link>
				<div className={styles.newPost}>
					<Link to="/author/new">New Post</Link>
				</div>
			</header>
			<div className={styles.allPosts}>
				{postsList}				
			</div>
		</main>
	)
}
