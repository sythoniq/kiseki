import { useState, useEffect } from 'react'

export default function useGetPosts() {
	const API = import.meta.env.VITE_BASE_API

	const [ isLoading, setIsLoading ] = useState(true)
	const [ isError, setIsError ] = useState(null)
	const [ posts, setPosts ] = useState()
	const [ postCategories, setPostCategories ] = useState()

	useEffect(() => {
		async function getPosts() {
			try {
				const res = await fetch(`${API}/posts`)
				const data = await res.json()

				if (res.status >= 500) {
					setIsError("Something went wrong. Please try again.")
					setIsLoading(false)
					return;
				}

				if (data.success == false) {
					setIsError(data.message)
					setIsLoading(false)
					return;
				}

				setPosts(data.posts);
				setPostCategories(data.posts.map((post)=> post.post_category))
				setIsLoading(false);
			} catch(e) {
				setIsError("Something went wrong. Please try again.")
				setIsLoading(false)
				return;
			}
		}

		getPosts()
	}, [API])

	return [ posts, postCategories, isLoading, isError ]
}
