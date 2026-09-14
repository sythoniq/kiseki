import { Outlet, Link } from 'react-router'
import { Toaster } from 'react-hot-toast'
import styles from './author.module.css'

export default function Author() {
	return (
		<main className={styles.authorPage}>
			<header className={styles.header}>
				<Link to="/">Kiseki</Link>
				<Link to="/author/new"><span>New Post</span></Link>
			</header>
			<Toaster position="top-right" />
			<Outlet />	
		</main>
	)
}
