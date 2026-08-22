import { useState, useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router'
import './app.css'
import useGetUser from './hooks/useGetUser.js'

import Sidebar from './components/sidebar/Sidebar.jsx'

export default function App() {
	const [ user, loading, error ] = useGetUser()
	if (loading) {
		return (
			<span>Loading spinner</span>
		)
	}

	if (error) {
		return (
			<span>Error check logs</span>
		)
	}
	return (
		<>
			<Sidebar userObj={user}/>
			<Outlet />
		</>
	)
}
