import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../axiosConfig';
import { cilArrowLeft } from '@coreui/icons';
import CIcon from '@coreui/icons-react'

const AddCustomer = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const customerInsert = (e) => {
    e.preventDefault();
    axios.post('/customer', form)
      .then((response) => {
        navigate("/all-customers")
          // console.log(response.data.message)
      })
      .catch(error => setErrors(error.response.data.errors));
  };

  return (
    <div>
        <div className="row">
            <button className='btn btn-light' style={{ backgroundColor: '#ebc281', width: "180px", color:"#000"}}>
                <Link to="/all-customers" style={{  textDecoration:"none", color:'black'}}>
                    <CIcon icon={cilArrowLeft} customClassName="nav-icon" style={{ width: "50px", height:"20px" }} />
                    All Customers
                </Link>
            </button>
        </div>
      <div className="row justify-content-center">
        <div className="col-xl-12 col-lg-12 col-md-12">
          <div className="card shadow-sm my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-12">
                  <div className="login-form">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Add Customer</h1>
                    </div>
                    <form className="user px-3" onSubmit={customerInsert} encType="multipart/form-data">
                      <div className="form-group mb-3">
                        <div className="row">
                          <div className="col-md-6">
                            <label htmlFor="exampleFormControlTextarea1"><b>Customer Name</b></label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Customer Full Name"
                              name="name"
                              value={form.name}
                              onChange={handleChange}
                            />
                            {errors.name && <small className="text-danger">{errors.name[0]}</small>}
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="exampleFormControlTextarea1"><b>Customer Email</b></label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Customer Email"
                              name="email"
                              value={form.email}
                              onChange={handleChange}
                            />
                            {errors.email && <small className="text-danger">{errors.email[0]}</small>}
                          </div>
                        </div>
                      </div>
                      <div className="form-group mb-3">
                        <div className="row">
                          <div className="col-md-6">
                            <label htmlFor="exampleFormControlTextarea1"><b>Customer Address</b></label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Customer Address"
                              name="address"
                              value={form.address}
                              onChange={handleChange}
                            />
                            {errors.address && <small className="text-danger">{errors.address[0]}</small>}
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="exampleFormControlTextarea1"><b>Customer Phone</b></label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Customer Phone"
                              name="phone"
                              value={form.phone}
                              onChange={handleChange}
                            />
                            {errors.phone && <small className="text-danger">{errors.phone[0]}</small>}
                          </div>
                        </div>
                      </div>
                      <div className="form-group mb-3">
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
  );
};

export default AddCustomer;
