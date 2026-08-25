import { useParams } from 'react-router'
import styles from './post.module.css'
import useGetPost from '../../hooks/useGetPost.js'

export default function Post() {
	const postId = Number(useParams().postId)
	const [ post, postComments, loading, error ] = useGetPost(postId)

	if (loading) {
		return (
			<span className="loader">loader</span>
		)
	}

	if (error) {
		return (
			<span>error</span>
		)
	}

	return (
		<>
			<main className={styles.postPage}>

			</main>
			<section className={styles.commentSection}></section>
		</>
	)
}
