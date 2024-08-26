import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from 'react-router-dom';
import { cilArrowLeft } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import axios from '../../axiosConfig';

const initialFormState = {
  name: '',
  email: '',
  address: '',
  sallery: '',
  nid: '',
  phone: '',
  photo: ''
};

const EditEmployee = () => {
  const [form, setForm] = useState(initialFormState);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const { data } = await axios.get(`/employee/${id}`);
        setForm(data);
        setPreview(`http://127.0.0.1:8000/storage/${data.photo}`);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo" && files[0]) {
      console.log(files[0].type);
      setForm(prevForm => ({
        ...prevForm,
        [name]: files[0],
      }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm(prevForm => ({
        ...prevForm,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/v1/employee/${id}`, form);
      navigate('/employee/all-employee');
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors(error.response?.data?.errors || {});
    }
  };

  const renderInput = (type, name, placeholder) => (
    <input
      type={type}
      className="form-control"
      placeholder={placeholder}
      name={name}
      value={form[name] || ''}
      onChange={handleChange}
    />
  );

  const renderError = (fieldName) => (
    <small className="text-danger">
      {errors[fieldName]}
    </small>
  );

  return (
    <>
      <div className="row">
        <button
          className='btn btn-light'
          style={{ backgroundColor: '#ebc281', width: "180px", color: "#000" }}
        >
          <Link to="/employee/all-employee" style={{ textDecoration: "none", color: 'black' }}>
            <CIcon icon={cilArrowLeft} customClassName="nav-icon" style={{ width: "50px", height: "20px" }} />
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
                      <h1 className="h4 text-gray-900 mb-4">Edit Employee</h1>
                    </div>
                    <form className="user px-3" onSubmit={handleSubmit} encType="multipart/form-data">
                      <div className="form-group mb-3">
                        <div className="row">
                          <div className="col-md-6">
                            {renderInput("text", "name", "Enter Your Full Name")}
                            {renderError("name")}
                          </div>
                          <div className="col-md-6">
                            {renderInput("email", "email", "Enter Your Email")}
                            {renderError("email")}
                          </div>
                        </div>
                      </div>
                      <div className="form-group mb-3">
                        <div className="row">
                          <div className="col-md-6">
                            {renderInput("text", "address", "Enter Your Address")}
                            {renderError("address")}
                          </div>
                          <div className="col-md-6">
                            {renderInput("text", "sallery", "Enter Your Salary")}
                            {renderError("sallery")}
                          </div>
                        </div>
                      </div>
                      <div className="form-group mb-3">
                        <div className="row">
                          <div className="col-md-6">
                            {renderInput("text", "nid", "Enter Your NID")}
                            {renderError("nid")}
                          </div>
                          <div className="col-md-6">
                            {renderInput("phone", "phone", "Enter Phone Number")}
                            {renderError("phone")}
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
                          {renderError("photo")}
                          <label className="p-0" htmlFor="customFile">Choose Image File</label>
                          {preview && (
                            <img src={preview} alt="Selected" style={{ height: "35px", width: "35px" }} />
                          )}
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
    </>
  );
};

export default EditEmployee;
