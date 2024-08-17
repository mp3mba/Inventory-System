import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { cilArrowLeft } from '@coreui/icons';
import CIcon from '@coreui/icons-react'

const AddCategory = () => {
  const [form, setForm] = useState({ 
    category_name: '' 
  });
  const [errors, setErrors] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data } = await axios.get(`http://127.0.0.1:8000/api/v1/category/${id}`);
        setForm(data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchCategory();
  }, [id]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const categoryInsert = (e) => {
    e.preventDefault();
    axios.put(`http://127.0.0.1:8000/api/v1/category/${id}`, form)
      .then(() => {
        navigate('/all-category');
        console.log("category added successful")
      })
      .catch(error => setErrors(error));
  };

  return (
    <div>
        <div className="row">
            <button className='btn btn-light' style={{ backgroundColor: '#ebc281', width: "180px", color:"#000"}}>
                <Link to="/all-category" style={{  textDecoration:"none", color:'black'}}>
                    <CIcon icon={cilArrowLeft} customClassName="nav-icon" style={{ width: "50px", height:"20px" }} />
                    All Categories
                </Link>
            </button>
        </div>
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12">
          <div className="card shadow-sm my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-12">
                  <div className="login-form">
                    <div className="text-center pt-3">
                      <h1 className="h4 text-gray-900 mb-4">Edit Category</h1>
                    </div>
                    <form className="user px-3" onSubmit={categoryInsert}>
                      <div className="form-group mb-3">
                        <div className="form-row">
                          <div className="col-md-12">
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputFirstName"
                              placeholder="Category Name"
                              name="category_name"
                              value={form.category_name}
                              onChange={handleInputChange}
                            />
                            {errors.category_name && (
                              <small className="text-danger">{errors.category_name[0]}</small>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="form-group mb-3">
                        <button type="submit" className="btn btn-primary btn-block">Update</button>
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

export default AddCategory;
