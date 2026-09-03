import { Outlet } from 'react-router'
import { Toaster } from 'react-hot-toast'
import './app.css'
import useGetUser from './hooks/useGetUser.js'

import Sidebar from './components/sidebar/Sidebar.jsx'

export default function App() {
	const [ user, loading, error, setUser ] = useGetUser()

	if (loading) {
		return (
			<span className="loader"></span>
		)
	}

	if (error) {
		return (
			<div className="error">
				<p>{error}</p>
			</div>
		)
	}
	
	return (
		<>
			<Sidebar userSet={setUser} userObj={user} />
			<Toaster position="top-right" />
			<Outlet />
		</>
	)
}
