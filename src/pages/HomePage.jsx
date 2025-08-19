import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const HomePage = () => {
  const [products, setProducts] = useState([])

  // Load products from public/products.json
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [])

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Welcome to Home Page</h1>

      {/* Add New Product Button */}
      <div className="mb-3">
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
                <th>Actions</th>
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
                    <td>
                      <Link
                        to={`/edit-product/${prod.id}`}
                        className="btn btn-primary btn-sm me-2"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(prod.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-3">
                    No products available.
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
