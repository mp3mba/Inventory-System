import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import { cilArrowLeft } from '@coreui/icons';
import CIcon from '@coreui/icons-react'

const AddSupplier = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    shopname: '',
    address: '',
  });
  const [errors, setErrors] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const { data } = await axios.get(`http://127.0.0.1:8000/api/v1/supplier/${id}`);
        setForm(data);
      } catch (error) {
        console.error("Error fetching supplier data:", error);
      }
    };

    fetchSuppliers();
  }, [id]);

  const supplierInsert = (e) => {
    e.preventDefault();
    axios.put(`http://127.0.0.1:8000/api/v1/supplier/${id}`, form)
      .then(() => {
        console.log("supplier added successfull")
        navigate('/all-supplier');
      })
      .catch((error) => setErrors(error));
  };

  return (
    <div>
        <div className="row">
            <button className='btn btn-light' style={{ backgroundColor: '#ebc281', width: "180px", color:"#000"}}>
                <Link to="/all-supplier" style={{  textDecoration:"none", color:'black'}}>
                <CIcon icon={cilArrowLeft} customClassName="nav-icon" style={{ width: "50px", height:"20px" }} />
                    All Suppliers
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
                      <h1 className="h4 text-gray-900 mb-4">Add Supplier</h1>
                    </div>
                    <form className="user px-3" onSubmit={supplierInsert} encType="multipart/form-data">
                      <div className="form-group mb-3">
                        <div className="row">
                          <div className="col-md-6">
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputFirstName"
                              placeholder="Enter Supplier Name"
                              value={form.name}
                              name='name'
                              onChange={(e) => setForm({ ...form, name: e.target.value })}
                            />
                              {errors.name && <small className="text-danger">{errors.name[0]}</small>}
                          </div>
                          <div className="col-md-6">
                              <input
                                  type="email"
                                  className="form-control"
                                  id="exampleInputFirstName"
                                  placeholder="Enter Supplier Email"
                                  value={form.email}
                                  name='email'
                                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                              />
                              {errors.email && <small className="text-danger">{errors.email[0]}</small>}
                          </div>
                        </div>
                      </div>
                        <div className="form-group mb-3">
                            <div className="row">
                              <div className="col-md-6">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="exampleInputFirstName"
                                  placeholder="Enter Supplier Address"
                                  name='address'
                                  value={form.address}
                                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                                />
                                  {errors.address && <small className="text-danger">{errors.address[0]}</small>}
                                </div>
                                <div className="col-md-6">
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="exampleInputFirstName"
                                      placeholder="Enter Supplier Shop Name"
                                      name='shopname'
                                      value={form.shopname}
                                      onChange={(e) => setForm({ ...form, shopname: e.target.value })}
                                    />
                                    {errors.shopname && <small className="text-danger">{errors.shopname[0]}</small>}
                                </div>
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <div className="row">
                                <div className="col-md-6">
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="exampleInputFirstName"
                                      placeholder="Enter Supplier Phone Number"
                                      name='phone'
                                      value={form.phone}
                                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                    />
                                    {errors.phone && <small className="text-danger">{errors.phone[0]}</small>}
                                </div>
                                <div className="col-md-6"></div>
                            </div>
                        </div>
                        <div className="form-group mb-3">
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

export default AddSupplier;
