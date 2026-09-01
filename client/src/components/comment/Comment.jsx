import styles from './comment.module.css'

export default function Comment({comment}) {
	return (
		<div className={styles.commentCard}>
			<div className={styles.commentDetails}>
				<span className={styles.userName}>{comment.author.user_name}</span>
				<span>{comment.comment_content}</span>
			</div>
		</div>
	)	
}
