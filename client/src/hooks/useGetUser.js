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
			try {

				if (token == null || token == undefined) {
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

				if (res.status >= 500) {
					setLoading(false)
					setError("Something went wrong. Please try again.")
					return;
				}
				const data = await res.json()

				if (active) {
					if (data.success != true) {
						setError(data.message)
						setLoading(false)
						return;
					}

					if (data.user == null) {
						setLoading(false)
						setError(null)
						setUser(null)
						return;
					}

					setUser(data.user)
					setLoading(false)
					return;
				}
			} catch(e) {
				setLoading(false)
				setError("Something went wrong. Please try again.")
			}
		}

		getUser()

		return () => {
			active = true;
		}
	}, [API, token])

	return [ user, loading, error, setUser ]
}
