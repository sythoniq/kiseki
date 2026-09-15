import { useState, useEffect } from 'react'
export default function useGetAllPosts() {
	const API = import.meta.env.VITE_BASE_API

	const [ isLoading, setIsLoading ] = useState(true)
	const [ isError, setIsError ] = useState(null)
	const [ posts, setPosts ] = useState()
	
		useEffect(() => {
		let active = true;
		async function getPosts() {
			try {
				const res = await fetch(`${API}/posts/author`, {
					headers: {
						"Content-Type": "application/json",
						"Authorization": localStorage.getItem("jwt-token")
					}
				})
				const data = await res.json()
				if (active) {
					if (res.status >= 500) {
						setIsError("Something went wrong. Please try again.")
						setIsLoading(false)
						return;
					}

					if (res.status == 401) {
						setIsError("Unauthorized")
						setIsLoading(false)
						return;
					}

					if (data.success == false) {
						setIsError(data.message)
						setIsLoading(false)
						return;
					}

					setPosts(data.posts);
					setIsLoading(false);
				}
			} catch(e) {
				setIsError("Something went wrong. Please try again.")
				setIsLoading(false)
				return;
			}
		}

		getPosts()

		return () => {
			active = false;
		}
	}, [API])

	return [ posts, isLoading, isError ]
}
