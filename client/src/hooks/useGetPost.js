import { useState, useEffect } from 'react'

export default function useGetPost(postId) {
	const API = import.meta.env.VITE_BASE_API

	const [ loading, setLoading ] = useState(true)	
	const [ error, setError ] = useState(null)
	const [ post, setPost ] = useState(null)
	const [ postComments, setPostComments ] = useState(null)

	useEffect(() => {
		async function getPost() {

		}
	}, [API])

	return [ post, postComments, loading, error ]
}
