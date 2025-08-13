import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const [products, setProducts] = useState([])

  // Load products from public/products.json
  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then(data => setProducts(data.products))
  }, [])

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Welcome to Home Page</h1>

      {/* Add New Product Button */}
      <div className="mb-3 text-center">
        <Link to="/add-product" className="btn btn-primary">
          Go to Add Product Page
        </Link>
      </div>

      {/* Product Table */}
      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white">
          <h5 className="mb-0">Product List</h5>
        </div>
        <div className="card-body p-0">
          <table className="table table-striped table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price ($)</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((prod) => (
                  <tr key={prod.id}>
                    <td>{prod.id}</td>
                    <td>{prod.name}</td>
                    <td>{prod.price}</td>
                    <td>{prod.category}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-3">
                    Loading products...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default HomePage
