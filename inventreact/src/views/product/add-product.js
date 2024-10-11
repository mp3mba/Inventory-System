import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../axiosConfig';
import { cilArrowLeft } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import '../../assets/product.css'

const AddProduct = () => {
  
  const [form, setForm] = useState({
    product_name: '',
    product_code: '',
    category_id: '',
    supplier_id: '',
    buying_price: '',
    selling_price: '',
    buying_date: new Date().toISOString().split('T')[0],
    product_quantity: '',
    reorder_level: '',
    stock_location: '',
    unit_of_measure: '',
  });

  const [newLocation, setNewLocation] = useState({
    stock_location: ""
  })

  const [showLocationForm, setShowLocationForm] = useState(false);

  const formatDate = (date) => {
    return date ? date.toISOString().split('T')[0] : '';
  };

  const handleDateChange = (date) => {
    const formattedDate = formatDate(date);
    setForm((prevForm) => ({
      ...prevForm,
      buying_date: formattedDate
    }));
  };

  const toggleLocationForm = () => {
    setShowLocationForm(!showLocationForm);
  };

  
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [stock_locations, setStock_locations] = useState([]);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    axios.get('/category')
    .then(({ data }) => setCategories(data))
    .catch(err => console.error(err));
    
    axios.get('/supplier')
    .then(({ data }) => setSuppliers(data))
    .catch(err => console.error(err));
    
    axios.get('/stock_location')
    .then(({ data }) => setStock_locations(data))
    .catch(err => console.error(err));
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  
  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setNewLocation({ ...newLocation, [name]: value });
  };
  
  const ProductInsert = (e) => {
    e.preventDefault();
    console.log(handleDateChange)
    axios.post('/product', form)
    .then((response) => {
      navigate('/all-product')
    })
    .catch(error => setErrors(error.response.data.errors));
  };
  
  const handleNewLocationSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/stock_location', newLocation);    
      // Hide the form after successful submission
      setShowLocationForm(false);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error("An error occurred:", error);
      }
    }
  };

  return (
    <div>
      <div className={`main-content ${showLocationForm ? 'blur' : ''}`}>
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
                                placeholder="Enter Product Name"
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
                                <option>
                                  select category
                                </option>
                                {categories.map(category => (
                                  <option key={category.id} value={category.id}>{category.category_name}</option>
                                ))}
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
                                <option>
                                  select supplier
                                </option>
                                {suppliers.map(supplier => (
                                  <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="form-group mb-3 ">
                          <div className="row">
                            <div className="col-md-6">
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
                            <div className="col-md-6 d-flex flex-column">
                              <label htmlFor="buyingDate">Buying Date</label>
                              <DatePicker
                                selected={form.buying_date ? new Date(form.buying_date) : null}
                                onChange={handleDateChange}
                                dateFormat="yyyy-MM-dd"
                                className="form-control"
                                id="buying_date"
                                name="buying_date"
                              />
                              {errors.buying_date && <small className="text-danger">{errors.buying_date[0]}</small>}
                            </div>
                            <div className="col-md-6">
                              <label htmlFor="productQuantity">Unit Of Measure</label>
                              <input
                                type="text"
                                className="form-control"
                                id="unitofMeasure"
                                placeholder="unit of measure"
                                name="unit_of_measure"
                                value={form.unit_of_measure}
                                onChange={handleChange}
                              />
                              {errors.unit_of_measure && <small className="text-danger">{errors.unit_of_measure[0]}</small>}
                            </div>
                          </div>
                        </div>
                        <div className="form-group mb-3 ">
                          <div className="row">
                            <div className="col-md-6 d-flex flex-column">
                              <label htmlFor="buyingDate">Reorder Level</label>
                              <input
                                type="number"
                                className="form-control"
                                id="reorderLevel"
                                placeholder="Enter Reorder Level"
                                name="reorder_level"
                                value={form.reorder_level}
                                onChange={handleChange}
                              />
                              {errors.reorder_level && <small className="text-danger">{errors.reorder_level[0]}</small>}
                            </div>
                            <div className="col-md-6">
                              <label htmlFor="productQuantity">Product Quantity</label>
                              <input
                                type="text"
                                className="form-control"
                                id="productQuantity"
                                placeholder="Enter Quantity"
                                name="product_quantity"
                                value={form.product_quantity}
                                onChange={handleChange}
                              />
                              {errors.product_quantity && <small className="text-danger">{errors.product_quantity[0]}</small>}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6 d-flex flex-column">
                              <label htmlFor="buyingDate">Stock Location</label>
                              <select
                                className="form-control"
                                id="stock_location"
                                name="location_id"
                                value={form.stock_location}
                                onChange={handleChange}
                              >
                                <option value="">
                                  select stock location
                                </option>
                                {stock_locations.map(location => (
                                  <option key={location.id} value={location.id}>{location.location_name}</option>
                                ))}
                              </select>
                              {errors.stock_location && <small className="text-danger">{errors.stock_location[0]}</small>}
                            </div>
                          </div>
                        </div>
                        <div className="form-group mb-3 ">
                          <button type="submit" className="btn btn-primary btn-block">Save</button>
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
      
       {/* Conditionally Render the New Location Form */}
       {showLocationForm && (
          <div className="d-flex justify-content-center w-100 full-page-form">
            <div className="form-container">
              <form onSubmit={handleNewLocationSubmit} className="w-100">
                <div>
                  <div className="form-group mb-3">
                    <label htmlFor="newLocation">New Location Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="newLocation"
                      placeholder="Enter New Location Name"
                      name="stock_location"
                      value={newLocation.stock_location}
                      onChange={handleLocationChange}
                    />
                    {errors.stock_location && <small className="text-danger">{errors.stock_location[0]}</small>}
                  </div>
                  <div className="d-flex justify-content-between">
                    <button type="button" className="btn pr-3" onClick={toggleLocationForm}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Save</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
    </div>
  );
};

export default AddProduct;
