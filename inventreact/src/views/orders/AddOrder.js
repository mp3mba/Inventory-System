import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { cilArrowLeft } from '@coreui/icons';
import CIcon from '@coreui/icons-react'

const TodayOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
//   const history = useHistory();

  useEffect(() => {
    // Uncomment and modify if you have authentication logic
    // if (!User.loggedIn()) {
    //   history.push('/');
    // }
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios.get('/api/orders/')
      .then(response => setOrders(response.data))
      .catch(error => console.error('Error fetching orders:', error));
  };

//   const filteredOrders = orders.filter(order => order.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
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
              <h6 className="m-0 font-weight-bold text-primary">Today Orders</h6>
            </div>
            <div className="table-responsive">
              <table className="table align-items-center table-flush">
                <thead className="thead-light">
                  <tr>
                    <th>Name</th>
                    <th>Total Amount</th>
                    <th>Pay</th>
                    <th>Due</th>
                    <th>PayBy</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {filteredOrders.map(order => ( */}
                    <tr key=''>
                      <td></td>
                      <td> </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <Link to='' className="btn btn-sm btn-primary">View</Link>
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

export default TodayOrders;
