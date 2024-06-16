import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { cilArrowLeft } from '@coreui/icons';
import CIcon from '@coreui/icons-react'

const SearchOrder = () => {
  const [date, setDate] = useState('');
  const [orders, setOrders] = useState([]);
//   const history = useHistory();

  useEffect(() => {
    // Uncomment and modify if you have authentication logic
    // if (!User.loggedIn()) {
    //   history.push('/');
    // }
  }, []);

  const searchDate = (event) => {
    event.preventDefault();
    axios.post('/api/search/order/', { date })
      .then(response => setOrders(response.data))
      .catch(error => console.error('Error searching orders:', error.response.data.errors));
  };

  return (
    <div>
       <div className="row">
            <button className='btn btn-light' style={{ backgroundColor: '#ebc281', width: "180px", color:"#000"}}>
                <Link to="/view-order" style={{  textDecoration:"none", color:'black'}}>
                    <CIcon icon={cilArrowLeft} customClassName="nav-icon" style={{ width: "50px", height:"20px" }} />
                    Today Order
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
                    <div className="text-center mt-4">
                      <h1 className="h4 text-gray-900 mb-4">Search Order</h1>
                    </div>
                    <form className="user px-3" onSubmit={searchDate}>
                      <div className="form-group mb-3">
                        <div className="form-row">
                          <div className="col-md-12">
                            <label htmlFor="searchDate"><b>Search By Date</b></label>
                            <input
                              type="date"
                              className="form-control"
                              id="searchDate"
                              required
                              value={date}
                              onChange={e => setDate(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-group mb-3">
                        <button type="submit" className="btn btn-primary btn-block">Search</button>
                      </div>
                    </form>
                    <hr />
                    <div className="text-center"></div>
                    <div className="text-center"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 mb-4">
          <div className="card">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Order Details</h6>
            </div>
            <div className="table-responsive">
              <table className="table align-items-center table-flush">
                <thead className="thead-light">
                  <tr>
                    <th>Product Name</th>
                    <th>Qty</th>
                    <th>SubTotal</th>
                    <th>Vat</th>
                    <th>Total</th>
                    <th>Pay</th>
                    <th>Due</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td>{order.name}</td>
                      <td>{order.qty}</td>
                      <td>{order.sub_total}</td>
                      <td>{order.vat}</td>
                      <td>{order.total} $</td>
                      <td>{order.pay} $</td>
                      <td>{order.due} $</td>
                    </tr>
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

export default SearchOrder;
