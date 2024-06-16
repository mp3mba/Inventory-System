import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { cilArrowLeft } from '@coreui/icons';
import CIcon from '@coreui/icons-react'
// import Swal from 'sweetalert2';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
//   const history = useHistory();

  useEffect(() => {
    // Uncomment and modify if you have authentication logic
    // if (!User.loggedIn()) {
    //   history.push('/');
    // }
    allCustomer();
  }, []);

  const allCustomer = () => {
    axios.get('/api/customer/')
      .then(({ data }) => setCustomers(data))
      .catch(error => console.error(error));
  };

  const deleteCustomer = (id) => {
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
        axios.delete(`/api/customer/${id}`)
          .then(() => {
            setCustomers(customers.filter(customer => customer.id !== id));
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          })
          .catch(() => {
            history.push('/customer');
          });
      }
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

//   const filteredCustomers = customers.filter(customer =>
//     customer.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

  return (
    <div>
       <div className="row">
            <button className='btn btn-light' style={{ backgroundColor: '#ebc281', width: "180px", color:"#000"}}>
                <Link to="/add-customers" style={{  textDecoration:"none", color:'black'}}>
                    <CIcon icon={cilArrowLeft} customClassName="nav-icon" style={{ width: "50px", height:"20px" }} />
                    Add Customer
                </Link>
            </button>
        </div>
      <br />
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        className="form-control"
        style={{ width: '300px' }}
        placeholder="Search Here"
      />
      <br />
      <div className="row">
        <div className="col-lg-12 mb-4">
          <div className="card">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Customer List</h6>
            </div>
            <div className="table-responsive">
              <table className="table align-items-center table-flush">
                <thead className="thead-light">
                  <tr>
                    <th>Name</th>
                    <th>Photo</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {filteredCustomers.map(customer => ( */}
                    <tr key=''>
                      <td></td>
                      <td><img src='' alt="customer" style={{ height: '40px', width: '40px' }} /></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <Link to='' className="btn btn-sm btn-primary">Edit</Link>
                        <button onClick={() => deleteCustomer(customer.id)} className="btn btn-sm btn-danger">
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

export default CustomerList;
