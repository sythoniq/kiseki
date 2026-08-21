import { useState, useEffect } from 'react'

export default function useGetUser() {
	const API = import.meta.env.VITE_BASE_API
	const token = localStorage.getItem("jwt-token")
	const [ loading, setLoading ] = useState(true)
	const [ error, setError ] = useState(null)
	const [ user, setUser ] = useState(null)
	
	useEffect(() => {
		let active = false;
		async function getUser() {
			if (!token) {
				setLoading(false)
				return;
			}
			const res = await fetch(`${API}/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": token
				}
			})

			if (!res.ok) {
				setError("Server error")
				setLoading(false)
				return;
			}

			const data = await res.json()

			if (data.success != true) {
				setError(data.error)
				setLoading(false)
				return;
			}

			setUser(data.user)
			setLoading(false)
			return;
		}

		getUser()

		return () => {
			active = true;
		}
	}, [API])

	return [ user, loading, error ]
}
