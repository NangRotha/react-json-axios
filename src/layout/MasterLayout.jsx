import React from 'react'
import { Outlet } from 'react-router-dom'

const MasterLayout = () => {
  return (
    <div>
        <header className='bg-primary text-white text-center py-3'>
            <h3>React JS + Axios</h3>
        </header>
        <main className='container mt-4'>
            <Outlet />
        </main>
    </div>
  )
}

export default MasterLayout