import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { cilArrowLeft } from '@coreui/icons';
import CIcon from '@coreui/icons-react'

const AddProduct = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
//   const history = useHistory();

//   useEffect(() => {
//     if (!User.loggedIn()) {
//       history.push('/');
//     } else {
//       allProduct();
//     }
//   }, []);

  const allProduct = async () => {
    try {
      const { data } = await axios.get('/api/product/');
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products', error);
    }
  };

  const filterSearch = products.filter(product =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                    <th>Photo</th>
                    <th>Category</th>
                    <th>Buying Price</th>
                    <th>Status</th>
                    <th>Quantity</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filterSearch.map(product => (
                    <tr key={product.id}>
                      <td>{product.product_name}</td>
                      <td>{product.product_code}</td>
                      <td><img src={product.image} alt="product" id="em_photo" /></td>
                      <td>{product.category_name}</td>
                      <td>{product.buying_price}</td>
                      <td>
                        {product.product_quantity >= 1 ? (
                          <span className="badge badge-success">Available</span>
                        ) : (
                          <span className="badge badge-danger">Stock Out</span>
                        )}
                      </td>
                      <td>{product.product_quantity}</td>
                      <td>
                        <Link to={`/edit-stock/${product.id}`} className="btn btn-sm btn-primary">Edit</Link>
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
