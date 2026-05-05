import { useState } from 'react'
import { Outlet } from 'react-router'

import Header from './components/Header.jsx'

import './styles/index.css'

export default function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

