import { useState, useEffect } from 'react'

export default function useGetPost(postId) {
	const API = import.meta.env.VITE_BASE_API

	const [ loading, setLoading ] = useState(true)	
	const [ error, setError ] = useState(null)
	const [ post, setPost ] = useState(null)
	const [ postComments, setPostComments ] = useState(null)

	useEffect(() => {
		async function getPost() {
			try {
				const res = await fetch(`${API}/posts/${postId}`);
				const data = await res.json()
				if (data.success != true) {
					setError(data.e)
					setLoading(false)
					return;
				}
				setPost(data.post)
				setPostComments(data.post.comments)
				setLoading(false)
			} catch(e) {
				setError(e.message)
			}
		}

		getPost()
	}, [API])

	return [ post, postComments, loading, error ]
}
