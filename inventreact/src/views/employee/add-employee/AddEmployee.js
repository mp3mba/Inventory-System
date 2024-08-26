import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cilArrowLeft } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import axios from '../../../axiosConfig';
import { data } from "autoprefixer";

const AddEmployee = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    sallery: '',
    nid: '',
    phone: '',
    photo: '',
  });

  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo" && files[0]) {
      setForm({
        ...form,
        [name]: files[0],
      });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm({
        ...form,
        [name]: value
      });
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    axios.post('/employee', formData)
    .then((response) => {
      navigate('/employee/all-employee');
      console.log(response.data)
    })
    .catch((error) => {
      setErrors(error.response.data.errors);
    })
  }

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
                    <form className="user px-3" onSubmit={submitForm} encType="multipart/form-data">
                      <div className="form-group mb-3">
                        <div className="row">
                          <div className="col-md-6">
                            <input 
                              type="text" 
                              className="form-control" 
                              id="exampleInputFirstName" 
                              placeholder="Enter Full Name" 
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
                              placeholder="Enter Email" 
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
                              placeholder="Enter Address" 
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
                          <div className="col-md-6">
                            <input 
                              type="phone" 
                              className="form-control" 
                              id="exampleInputFirstName" 
                              placeholder="Enter Phone number" 
                              name="phone"
                              value={form.phone}
                              onChange={handleChange}
                            />
                            <small className="text-danger">
                              {errors.phone}
                            </small>
                          </div>
                        </div>
                      </div>
                          <div className="col-md-6">
                            <div className="d-flex">
                              <input 
                                type="file" 
                                name="photo"
                                className="custom-file-input" 
                                id="customFile" 
                                onChange={handleChange}
                              />
                              <small className="text-danger">
                                {errors.photo}
                              </small>
                              <label className="p-0" htmlFor="customFile">Choosed Image</label>
                              {preview && (
                                <img src={preview} alt="Selected" style={{ height: "35px", width: "35px" }} />
                              )}                           
                            </div>
                          </div>
                          
                      <div className="form-group mb-3">
                        <button type="submit" className="btn btn-primary btn-block">Save</button>
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
