import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { cilArrowLeft } from '@coreui/icons';
import CIcon from '@coreui/icons-react'

const AddProduct = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    allProduct();
  }, []);

  const allProduct = () => {
    axios.get('http://127.0.0.1:8000/api/v1/product')
      .then(({ data }) => setProducts(data))
      .catch(error => console.error(error));
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
                <Link to="/all-product" style={{  textDecoration:"none", color:'black'}}>
                    <CIcon icon={cilArrowLeft} customClassName="nav-icon" style={{ width: "50px", height:"20px" }} />
                    Add Product
                </Link>
            </button>
            </div>
      <br />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control"
        style={{ width: '300px' }}
        placeholder="Search Here"
      />
      <br />
      <div className="row">
        <div className="col-lg-12 mb-4">
          <div className="card">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Stock</h6>
            </div>
            <div className="table-responsive">
              <table className="table align-items-center table-flush">
                <thead className="thead-light">
                  <tr>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Category</th>
                    <th>Buying Price</th>
                    <th>Quantity</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(product => (
                    <tr key={product.id}>
                      <td>{product.product_name}</td>
                      <td>{product.product_code}</td>
                      <td>{product.category_name}</td>
                      <td>{product.buying_price}</td>
                      <td>{product.product_quantity}</td>
                      <td>
                        {product.product_quantity >= 1 ? (
                          <span className="badge bg-success">Available</span>
                        ) : (
                          <span className="badge bg-danger">Stock Out</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* <div className="card-footer"></div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
