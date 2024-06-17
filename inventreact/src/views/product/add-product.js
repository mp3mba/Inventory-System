import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { cilArrowLeft } from '@coreui/icons';
import CIcon from '@coreui/icons-react'
// import Swal from 'sweetalert2';

const AddProduct = () => {
  const [form, setForm] = useState({
    product_name: '',
    product_code: '',
    category_id: '',
    supplier_id: '',
    root: '',
    buying_price: '',
    selling_price: '',
    buying_date: '',
    image: '',
    product_quantity: ''
  });
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
//   const history = useHistory();

  // Uncomment and modify if you have authentication logic
  // useEffect(() => {
  //   if (!User.loggedIn()) {
  //     history.push('/');
  //   }
  // }, [history]);

  useEffect(() => {
    axios.get('/api/category/')
      .then(({ data }) => setCategories(data))
      .catch(err => console.error(err));

    axios.get('/api/supplier/')
      .then(({ data }) => setSuppliers(data))
      .catch(err => console.error(err));
  }, []);

  const onFileSelected = (event) => {
    const file = event.target.files[0];
    if (file.size > 1048770) {
      Swal.fire('Error', 'Image size should be less than 1MB', 'error');
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        setForm({ ...form, image: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const ProductInsert = (e) => {
    e.preventDefault();
    axios.post('/api/product', form)
      .then(() => {
        history.push('/product');
        Swal.fire('Success', 'Product added successfully', 'success');
      })
      .catch(error => setErrors(error.response.data.errors));
  };

  return (
    <div>
       <div className="row">
          <button className='btn btn-light' style={{ backgroundColor: '#ebc281', width: "180px", color:"#000"}}>
            <Link to="/all-product" style={{  textDecoration:"none", color:'black'}}>
              <CIcon icon={cilArrowLeft} customClassName="nav-icon" style={{ width: "50px", height:"20px" }} />
                All Product
            </Link>
          </button>
        </div>
      <div className="row mt-3">
        <div className="col-xl-12 col-lg-12 col-md-12">
          <div className="card shadow-sm my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-12">
                  <div className="login-form">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Add Product</h1>
                    </div>
                    <form className="user px-3" onSubmit={ProductInsert} encType="multipart/form-data">
                      <div className="form-group mb-3">
                        <div className="row">
                          <div className="col-md-6">
                            <label htmlFor="productName">Product Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="productName"
                              placeholder="Enter Your Product Name"
                              name="product_name"
                              value={form.product_name}
                              onChange={handleChange}
                            />
                            {errors.product_name && <small className="text-danger">{errors.product_name[0]}</small>}
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="productCode">Product Code</label>
                            <input
                              type="text"
                              className="form-control"
                              id="productCode"
                              placeholder="Enter Your Product Code"
                              name="product_code"
                              value={form.product_code}
                              onChange={handleChange}
                            />
                            {errors.product_code && <small className="text-danger">{errors.product_code[0]}</small>}
                          </div>
                        </div>
                      </div>
                      <div className="form-group mb-3 ">
                        <div className="row">
                          <div className="col-md-6">
                            <label htmlFor="productCategory">Product Category</label>
                            <select
                              className="form-control"
                              id="productCategory"
                              name="category_id"
                              value={form.category_id}
                              onChange={handleChange}
                            >
                              {/* {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.category_name}</option>
                              ))} */}
                            </select>
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="productSupplier">Product Supplier</label>
                            <select
                              className="form-control"
                              id="productSupplier"
                              name="supplier_id"
                              value={form.supplier_id}
                              onChange={handleChange}
                            >
                              {/* {suppliers.map(supplier => (
                                <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                              ))} */}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="form-group mb-3 ">
                        <div className="row">
                          <div className="col-md-4">
                            <label htmlFor="productRoot">Product Root</label>
                            <input
                              type="text"
                              className="form-control"
                              id="productRoot"
                              name="root"
                              value={form.root}
                              onChange={handleChange}
                            />
                            {errors.root && <small className="text-danger">{errors.root[0]}</small>}
                          </div>
                          <div className="col-md-4">
                            <label htmlFor="buyingPrice">Buying Price</label>
                            <input
                              type="text"
                              className="form-control"
                              id="buyingPrice"
                              name="buying_price"
                              value={form.buying_price}
                              onChange={handleChange}
                            />
                            {errors.buying_price && <small className="text-danger">{errors.buying_price[0]}</small>}
                          </div>
                          <div className="col-md-4">
                            <label htmlFor="sellingPrice">Selling Price</label>
                            <input
                              type="text"
                              className="form-control"
                              id="sellingPrice"
                              name="selling_price"
                              value={form.selling_price}
                              onChange={handleChange}
                            />
                            {errors.selling_price && <small className="text-danger">{errors.selling_price[0]}</small>}
                          </div>
                        </div>
                      </div>
                      <div className="form-group mb-3 ">
                        <div className="row">
                          <div className="col-md-6">
                            <label htmlFor="buyingDate">Buying Date</label>
                            <input
                              type="date"
                              className="form-control"
                              id="buyingDate"
                              name="buying_date"
                              value={form.buying_date}
                              onChange={handleChange}
                            />
                            {errors.buying_date && <small className="text-danger">{errors.buying_date[0]}</small>}
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="productQuantity">Product Quantity</label>
                            <input
                              type="text"
                              className="form-control"
                              id="productQuantity"
                              placeholder="Enter Your Quantity"
                              name="product_quantity"
                              value={form.product_quantity}
                              onChange={handleChange}
                            />
                            {errors.product_quantity && <small className="text-danger">{errors.product_quantity[0]}</small>}
                          </div>
                        </div>
                      </div>
                      <div className="form-group mb-3 ">
                        <div className="row">
                          <div className="col-md-6">
                            <input
                              type="file"
                              className="custom-file-input"
                              id="customFile"
                              onChange={onFileSelected}
                            />
                            {errors.image && <small className="text-danger">{errors.image[0]}</small>}
                            <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                          </div>
                          <div className="col-md-6">
                            {form.image && <img src={form.image} alt="Product" style={{ height: '40px', width: '40px' }} />}
                          </div>
                        </div>
                      </div>
                      <div className="form-group mb-3 ">
                        <button type="submit" className="btn btn-primary btn-block">Submit</button>
                      </div>
                    </form>
                    <div className="text-center"></div>
                    <div className="text-center"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
