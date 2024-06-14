import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { cilArrowLeft } from '@coreui/icons';
import CIcon from '@coreui/icons-react'
// import Notification from 'your-notification-library'; // Replace with your notification library

const AddCategory = () => {
  const [form, setForm] = useState({ category_name: '' });
  const [errors, setErrors] = useState({});
//   const history = useHistory();

  // Uncomment and modify if you have authentication logic
  // useEffect(() => {
  //   if (!User.loggedIn()) {
  //     history.push('/');
  //   }
  // }, [history]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const categoryInsert = (e) => {
    e.preventDefault();
    axios.post('/api/category', form)
      .then(() => {
        history.push('/category');
        Notification.success('Category Created Successfully');
      })
      .catch(error => setErrors(error.response.data.errors));
  };

  return (
    <div>
        <div className="row">
            <button className='btn btn-light' style={{ backgroundColor: '#ebc281', width: "180px", color:"#000"}}>
                <Link to="/add-supplier" style={{  textDecoration:"none", color:'black'}}>
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
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Add Category</h1>
                    </div>
                    <form className="user px-3" onSubmit={categoryInsert}>
                      <div className="form-group mb-3">
                        <div className="form-row">
                          <div className="col-md-12">
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputFirstName"
                              placeholder="Enter Your Category Name"
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

export default AddCategory;
