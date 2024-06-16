import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';import { cilArrowLeft } from '@coreui/icons';
import CIcon from '@coreui/icons-react'

// import Swal from 'sweetalert2';

const AddCustomer = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    photo: null
  });
  const [errors, setErrors] = useState({});
//   const history = useHistory();

  // Uncomment and modify if you have authentication logic
  // useEffect(() => {
  //   if (!User.loggedIn()) {
  //     history.push('/');
  //   }
  // }, []);

  const onFileSelected = (event) => {
    let file = event.target.files[0];
    if (file.size > 1048770) {
      Swal.fire('Image Validation', 'File size exceeds limit', 'error');
    } else {
      let reader = new FileReader();
      reader.onload = (e) => {
        setForm({ ...form, photo: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const customerInsert = (e) => {
    e.preventDefault();
    axios.post('/api/customer', form)
      .then(() => {
        history.push('/customer');
        Swal.fire('Success', 'Customer added successfully', 'success');
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
                              placeholder="Enter Your Full Name"
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
                              placeholder="Enter Your Email"
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
                              placeholder="Enter Your Address"
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
                              placeholder="Enter Your Phone"
                              name="phone"
                              value={form.phone}
                              onChange={handleChange}
                            />
                            {errors.phone && <small className="text-danger">{errors.phone[0]}</small>}
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
                              onChange={onFileSelected}
                            />
                            {errors.photo && <small className="text-danger">{errors.photo[0]}</small>}
                            <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                          </div>
                          <div className="col-md-6">
                            {form.photo && <img src={form.photo} alt="Customer" style={{ height: '40px', width: '40px' }} />}
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
