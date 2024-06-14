import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { cilArrowLeft } from '@coreui/icons';
import CIcon from '@coreui/icons-react'
// import Toast from 'your-toast-library'; 

const AddSupplier = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    shopname: '',
    address: '',
    photo: null,
  });
  const [errors, setErrors] = useState({});
//   const history = useHistory();

  const onFileSelected = (event) => {
    let file = event.target.files[0];
    if (file.size > 1048770) {
      Toast.fire({
        icon: 'warning',
        title: 'Uploaded Image is Too Large',
      });
    } else {
      let reader = new FileReader();
      reader.onload = (event) => {
        setForm({ ...form, photo: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const supplierInsert = (e) => {
    e.preventDefault();
    axios.post('/api/supplier', form)
      .then(() => {
        history.push('/supplier');
        Toast.fire({
          icon: 'success',
          title: 'Supplier Created Successfully',
        });
      })
      .catch((error) => setErrors(error.response.data.errors));
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
                                    placeholder="Enter Your Full Name"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    />
                                    {errors.name && <small className="text-danger">{errors.name[0]}</small>}
                                </div>
                                <div className="col-md-6">
                                    <input
                                    type="email"
                                    className="form-control"
                                    id="exampleInputFirstName"
                                    placeholder="Enter Your Email"
                                    value={form.email}
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
                                    placeholder="Enter Your Address"
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
                                    placeholder="Enter Your Shop Name"
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
                                    placeholder="Enter Your Phone Number"
                                    value={form.phone}
                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                    />
                                    {errors.phone && <small className="text-danger">{errors.phone[0]}</small>}
                                </div>
                                <div className="col-md-6"></div>
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
                                    {form.photo && <img src={form.photo} alt="Selected" style={{ height: '40px', width: '40px' }} />}
                                </div>
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
