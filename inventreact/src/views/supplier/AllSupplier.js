import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import Swal from 'sweetalert2';
import { cilArrowLeft } from '@coreui/icons';
import CIcon from '@coreui/icons-react'

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
//   const history = useHistory();

  useEffect(() => {
    allSupplier();
  }, []);

  const allSupplier = () => {
    axios.get('/api/supplier/')
      .then(({ data }) => setSuppliers(data))
      .catch(error => console.error(error));
  };

  const deleteSupplier = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        axios.delete(`/api/supplier/${id}`)
          .then(() => {
            setSuppliers(suppliers.filter(supplier => supplier.id !== id));
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
          })
          .catch(() => {
            history.push('/supplier');
          });
      }
    });
  };

//   const filtersearch = suppliers.filter(supplier => 
//     supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

  return (
    <div>
      <div className="row">
        <button className='btn btn-light' style={{ backgroundColor: '#ebc281', width: "180px", color:"#000"}}>
          <Link to="/add-supplier" style={{  textDecoration:"none", color:'black'}}>
            <CIcon icon={cilArrowLeft} customClassName="nav-icon" style={{ width: "50px", height:"20px" }} />
              Add Category
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
                    <th>Photo</th>
                    <th>Phone</th>
                    <th>Shop Name</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {filtersearch.map(supplier => ( */}
                    <tr key="">
                      <td>{name}</td>
                      <td><img src="" id="em_photo" alt="supplier" /></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <Link to="" className="btn btn-sm btn-primary">Edit</Link>
                        <button onClick={() => deleteSupplier(id)} className="btn btn-sm btn-danger">
                          <font color="#ffffff">Delete</font>
                        </button>
                      </td>
                    </tr>
                  {/* ))} */}
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
