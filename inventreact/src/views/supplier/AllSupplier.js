import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { cilArrowLeft } from '@coreui/icons';
import { BarLoader } from 'react-spinners';
import CIcon from '@coreui/icons-react'

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    allSupplier();
  }, []);

  const allSupplier = async () => {
    try{
      const { data } = await axios.get('http://127.0.0.1:8000/api/v1/supplier')
      setSuppliers(data)
      setLoading(false)
    }
    catch (error) {
      console.error("Error fetching suppliers:", error);
      setLoading(false)
    }
  };

  const deleteSupplier = async (id) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/v1/supplier/${id}`);
        setSuppliers(suppliers.filter(supplier => supplier.id !== id));
      } catch (error) {
        navigate('/all-supplier');
      }
    }
  };

  const filterSearch = suppliers.filter(supplier => {
    const search = searchTerm.toLowerCase().replace(/\s+/g, '')
    return (
      supplier.name.toLowerCase().replace(/\s+/g, '').includes(search) ||
      supplier.email.toLowerCase().replace(/\s+/g, '').includes(search) ||
      supplier.phone.toLowerCase().replace(/\s+/g, '').includes(search) ||
      supplier.address.toLowerCase().replace(/\s+/g, '').includes(search) ||
      supplier.shopname.toLowerCase().replace(/\s+/g, '').includes(search) 
    );
  });

  return (
    <div>
      <div className="row">
        <button className='btn btn-light' style={{ backgroundColor: '#ebc281', width: "180px", color:"#000"}}>
          <Link to="/add-supplier" style={{  textDecoration:"none", color:'black'}}>
            <CIcon icon={cilArrowLeft} customClassName="nav-icon" style={{ width: "50px", height:"20px" }} />
              Add Supplier
          </Link>
        </button>
      </div>
      <br />
      <input
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="form-control"
        style={{ width: '300px' }}
        placeholder="Search Here"
      />
      <br />
      <div className="row">
        <div className="col-lg-12 mb-4">
          <div className="card">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Supplier List</h6>
            </div>
            <div className="table-responsive">
              <table className="table align-items-center table-flush">
                <thead className="thead-light">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Shop Name</th>
                    <th>Address</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7" style={{ padding: '20px', display: 'flex', justifyContent: 'center'}}>
                        <BarLoader color="#0000FF" width="850" />
                      </td>
                    </tr>
                  ) : (
                  filterSearch.map(supplier => (
                        <tr key={supplier.id}>
                          <td>{supplier.name}</td>
                          <td>{supplier.email}</td>
                          <td>{supplier.phone}</td>
                          <td>{supplier.shopname}</td>
                          <td>{supplier.address}</td>
                          <td>
                            <Link to={{ pathname: `/edit-supplier/${supplier.id}` }} className="btn btn-sm btn-primary m-1">Edit</Link>
                            <button onClick={() => deleteSupplier(supplier.id)} className="btn btn-sm btn-danger">
                              <font color="#ffffff">Delete</font>
                            </button>
                          </td>
                        </tr>
                      )
                    ))}
                </tbody>
              </table>
            </div>
            <div className="card-footer"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierList;
