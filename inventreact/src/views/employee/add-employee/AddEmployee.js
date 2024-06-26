import React, { useState } from "react";
import { Link } from "react-router-dom"; // Use Link from react-router-dom
import { cilArrowLeft } from '@coreui/icons';
import CIcon from '@coreui/icons-react'


const AddEmployee = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    sallery: '',
    joining_date: '',
    nid: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <div className="row">
        <button className='btn btn-light' style={{ backgroundColor: '#ebc281', width: "180px", color:"#000"}}>
          <Link to="/employee/all-employee" style={{  textDecoration:"none", color:'black'}}>
            <CIcon icon={cilArrowLeft} customClassName="nav-icon" style={{ width: "50px", height:"20px" }} />
              All Employee
          </Link>
        </button>
      </div>
      <div className="row justify-content-center">
        <div className="col-xl-12 col-lg-12 col-md-12">
          <div className="card shadow-sm my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-12">
                  <div className="login-form mt-4">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Add Employee</h1>
                    </div>
                    <form className="user px-3" encType="multipart/form-data">
                      <div className="form-group mb-3">
                        <div className="row">
                          <div className="col-md-6">
                            <input 
                              type="text" 
                              className="form-control" 
                              id="exampleInputFirstName" 
                              placeholder="Enter Your Full Name" 
                              name="name"
                              value={form.name}
                              onChange={handleChange}
                            />
                            <small className="text-danger">
                              {errors.name}
                            </small>
                          </div>
                          <div className="col-md-6">
                            <input 
                              type="email" 
                              className="form-control" 
                              id="exampleInputFirstName" 
                              placeholder="Enter Your Email" 
                              name="email"
                              value={form.email}
                              onChange={handleChange}
                            />
                            <small className="text-danger">
                              {errors.email}
                            </small>
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
                              placeholder="Enter Your Address" 
                              name="address"
                              value={form.address}
                              onChange={handleChange}
                            />
                            <small className="text-danger">
                              {errors.address}
                            </small>
                          </div>
                          <div className="col-md-6">
                            <input 
                              type="text" 
                              className="form-control" 
                              id="exampleInputFirstName" 
                              placeholder="Enter Your Salary" 
                              name="sallery"
                              value={form.sallery}
                              onChange={handleChange}
                            />
                            <small className="text-danger">
                              {errors.sallery}
                            </small>
                          </div>     
                        </div>
                      </div>
                      <div className="form-group mb-3">
                        <div className="row">
                          <div className="col-md-6">
                            <input 
                              type="date" 
                              className="form-control" 
                              id="exampleInputFirstName" 
                              placeholder="Enter Your Joining Date" 
                              name="joining_date"
                              value={form.joining_date}
                              onChange={handleChange}
                            />
                            <small className="text-danger">
                              {errors.joining_date}
                            </small>
                          </div>
                          <div className="col-md-6">
                            <input 
                              type="text" 
                              className="form-control" 
                              id="exampleInputFirstName" 
                              placeholder="Enter Your Nid" 
                              name="nid"
                              value={form.nid}
                              onChange={handleChange}
                            />
                            <small className="text-danger">
                              {errors.nid}
                            </small>
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
                              placeholder="Enter Your phone Number" 
                              name="phone"
                              value={form.phone}
                              onChange={handleChange}
                            />
                            <small className="text-danger">
                              {errors.phone}
                            </small>
                          </div>
                          <div className="col-md-6">
                          </div>     
                        </div>
                      </div>
                      <div className="form-group mb-3">
                        <div className="row">
                          <div className="col-md-6">
                            <input 
                              type="file" 
                              className="custom-file-input" 
                              id="customFile" 
                            />
                            <small className="text-danger">
                              {errors.photo}
                            </small>
                            <label className="custom-file-label" htmlFor="customFile">Choose Image file</label>
                          </div>
                          <div className="col-md-6">
                            <img style={{ height: "40px", width: "40px" }} />
                          </div>     
                        </div>
                      </div>
                      <div className="form-group mb-3">
                        <button type="submit" className="btn btn-primary btn-block">Submit</button>
                      </div>
                    </form>
                    <div className="text-center">
                    </div>
                    <div className="text-center">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEmployee;
