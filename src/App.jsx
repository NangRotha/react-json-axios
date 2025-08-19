import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MasterLayout from './layout/MasterLayout'
import HomePage from './pages/HomePage'
import AddProductPage from './pages/AddProductPage'
import EditProductPage from './pages/EditProductPage'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MasterLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/add-product" element={<AddProductPage/>} />
            <Route path="/edit-product/:id" element={<EditProductPage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
