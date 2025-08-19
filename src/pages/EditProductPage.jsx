import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: ''
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/products/${id}`, {
        ...formData,
        price: parseFloat(formData.price)
      });
      navigate('/'); // Navigate back to home page after successful update
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Edit Product</h1>
      <div className="mb-3">
        <Link to="/" className="btn btn-secondary">Back to Home</Link>
      </div>
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
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Update Product</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProductPage;

