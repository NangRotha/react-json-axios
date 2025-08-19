import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const AddProductPage = () => {
  const [products, setProducts] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: ''
  })

  // Load initial products (from local JSON or API)
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
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    const newProduct = {
      ...formData,
      price: parseFloat(formData.price)
    }

    try {
      const response = await axios.post('http://localhost:5000/products', newProduct);
      console.log('Product added:', response.data);
      // Clear form
      setFormData({ name: '', price: '', category: '' });
      // Optionally, refresh the product list or navigate away
      // For simplicity, we'll just clear the form and assume success
      window.location.reload(); // Reload the page to show updated list
    } catch (error) {
      console.error('Error adding product:', error);
    }
  }

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Add New Product</h1>

      {/* Back to home */}
      <div className="mb-3">
        <Link to="/" className="btn btn-secondary">Back to Home</Link>
      </div>

      {/* Form */}
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="card p-3 shadow-sm">
            <div className="mb-3">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter product name"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter price"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter category"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Add Product</button>
          </form>
        </div>

        {/* Live Preview */}
        <div className="col-md-6">
          <div className="card shadow-sm p-3">
            <h5>Live Preview</h5>
            {formData.name || formData.price || formData.category ? (
              <ul className="list-group">
                <li className="list-group-item"><strong>Name:</strong> {formData.name}</li>
                <li className="list-group-item"><strong>Price:</strong> ${formData.price}</li>
                <li className="list-group-item"><strong>Category:</strong> {formData.category}</li>
              </ul>
            ) : (
              <p className="text-muted">Fill out the form to see a preview</p>
            )}
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="mt-4">
        <h3>Existing Products</h3>
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price ($)</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {products.map(prod => (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td>{prod.name}</td>
                <td>{prod.price}</td>
                <td>{prod.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AddProductPage
