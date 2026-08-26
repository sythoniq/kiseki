import { useState, useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router'
import toast, { Toaster } from 'react-hot-toast'
import './app.css'
import useGetUser from './hooks/useGetUser.js'

import Sidebar from './components/sidebar/Sidebar.jsx'

export default function App() {
	const [ user, loading, error ] = useGetUser()

	if (loading) {
		return (
			<span className="loader"></span>
		)
	}

	if (error) {
		return toast.error(`${error.message}`)
	}
	
	return (
		<>
			<Sidebar user={user} />
			<Toaster position="top-right" />
			<Outlet />
		</>
	)
}
