import { useState, useEffect } from 'react'
import './app.css'
import useGetUser from './hooks/useGetUser.js'

import Sidebar from './components/sidebar/Sidebar.jsx'

export default function App() {
	const [ user, loading, error ] = useGetUser()
	return (
		<Sidebar userObj={user}/>
	)
}
