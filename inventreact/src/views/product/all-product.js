import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axiosConfig';
import { cilArrowLeft } from '@coreui/icons';
import CIcon from '@coreui/icons-react'

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    allProduct();
  }, []);

  const allProduct = () => {
    axios.get('/product')
      .then(({ data }) => setProducts(data))
      .catch(error => console.error(error));
  };

  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await axios.delete(`/product/${id}`);
        setProducts(products.filter(product => product.id !== id));
      } catch (error) {
        navigate('/all-product');
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(product => {
    const search = searchTerm.toLowerCase().replace(/\s+/g, '')
    return (
      product.product_name.toLowerCase().replace(/\s+/g, '').includes(search) ||
      product.product_code.toLowerCase().replace(/\s+/g, '').includes(search) ||
      product.buying_price.toLowerCase().replace(/\s+/g, '').includes(search) ||
      product.selling_price.toLowerCase().replace(/\s+/g, '').includes(search) ||
      product.buying_date.toLowerCase().replace(/\s+/g, '').includes(search) ||
      product.product_quantity.toLowerCase().replace(/\s+/g, '').includes(search)
    );
  });

  return (
    <div>
        <div className="row">
            <button className='btn btn-light' style={{ backgroundColor: '#ebc281', width: "180px", color:"#000"}}>
                <Link to="/add-product" style={{  textDecoration:"none", color:'black'}}>
                    <CIcon icon={cilArrowLeft} customClassName="nav-icon" style={{ width: "50px", height:"20px" }} />
                    Add Products
                </Link>
            </button>
        </div>
      <br />
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        className="form-control"
        style={{ width: '300px' }}
        placeholder="Search Here"
      />
      <br />
      <div className="row">
        <div className="col-lg-12 mb-4">
          <div className="card">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Product List</h6>
            </div>
            <div className="table-responsive">
              <table className="table align-items-center table-flush">
                <thead className="thead-light">
                  <tr>
                    <th>Product Name</th>
                    <th>Product Code</th>
                    <th>Product Category</th>
                    <th>Supplied By</th>
                    <th>Buying Price</th>
                    <th>Selling Price</th>
                    <th>Buying Date</th>
                    <th>Qty Available</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(product => (
                    <tr key={product.id}>
                      <td>{product.product_name}</td>
                      <td>{product.product_code}</td>
                      <td>{product.category_name}</td>
                      <td>{product.supplier_name}</td>
                      <td>{product.buying_price}</td>
                      <td>{product.selling_price}</td>
                      <td>{product.buying_date}</td>
                      <td>{product.product_quantity}</td>
                      <td>
                        <Link to={`/edit-product/${product.id}`} className="btn btn-sm btn-primary m-1">Edit</Link>
                        <button onClick={() => deleteProduct(product.id)} className="btn btn-sm btn-danger">
                          <font color="#ffffff">Delete</font>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card-footer"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
