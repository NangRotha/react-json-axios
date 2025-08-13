import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<h1>Welcome to the Home Page</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App