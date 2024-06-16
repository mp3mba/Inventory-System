import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { cilArrowLeft } from '@coreui/icons';
import CIcon from '@coreui/icons-react'

const OrderDetails = () => {
  const [orders, setOrders] = useState({});
  const [details, setDetails] = useState([]);
  const [errors, setErrors] = useState({});
  const { id } = useParams();
//   const history = useHistory();

  // Uncomment and modify if you have authentication logic
  // useEffect(() => {
  //   if (!User.loggedIn()) {
  //     history.push('/');
  //   }
  // }, []);

  useEffect(() => {
    axios.get(`/api/order/details/${id}`)
      .then(response => setOrders(response.data))
      .catch(err => console.log('error', err));

    axios.get(`/api/order/orderdetails/${id}`)
      .then(response => setDetails(response.data))
      .catch(err => console.log('error', err));
  }, [id]);

  return (
    <div>
        <div className="row">
            <button className='btn btn-light' style={{ backgroundColor: '#ebc281', width: "180px", color:"#000"}}>
                <Link to="/employee/all-employee" style={{  textDecoration:"none", color:'black'}}>
                    <CIcon icon={cilArrowLeft} customClassName="nav-icon" style={{ width: "50px", height:"20px" }} />
                    Go Back
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
                      <h1 className="h4 text-gray-900 mb-4">Order Details</h1>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 mb-4">
                        <div className="card">
                          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">Order Details</h6>
                          </div>
                          <div className="table-responsive">
                            <ul className="list-group">
                              <li className="list-group-item"><b>Name :</b> {orders.name}</li>
                              <li className="list-group-item"><b>Phone :</b> {orders.phone}</li>
                              <li className="list-group-item"><b>Address :</b> {orders.address}</li>
                              <li className="list-group-item"><b>Date :</b> {orders.order_date}</li>
                              <li className="list-group-item"><b>Pay Through :</b> {orders.payby}</li>
                            </ul>
                          </div>
                          <div className="card-footer"></div>
                        </div>
                      </div>
                      <div className="col-lg-6 mb-4">
                        <div className="card">
                          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">Order Details</h6>
                          </div>
                          <div className="table-responsive">
                            <ul className="list-group">
                              <li className="list-group-item"><b>Sub Total :</b> {orders.sub_total} $</li>
                              <li className="list-group-item"><b>Vat :</b> {orders.vat} $</li>
                              <li className="list-group-item"><b>Total :</b> {orders.total} $</li>
                              <li className="list-group-item"><b>Pay Amount :</b> {orders.pay} $</li>
                              <li className="list-group-item"><b>Due Amount :</b> {orders.due} $</li>
                            </ul>
                          </div>
                          <div className="card-footer"></div>
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
                                  <th>Product Code</th>
                                  <th>Image</th>
                                  <th>Qty</th>
                                  <th>Unit Price</th>
                                  <th>Total</th>
                                </tr>
                              </thead>
                              <tbody>
                                {/* {details.map(detail => ( */}
                                  <tr key=''>
                                    <td></td>
                                    <td></td>
                                    <td><img src='' alt="product" style={{ height: '40px', width: '40px' }} /></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                  </tr>
                                {/* ))} */}
                              </tbody>
                            </table>
                          </div>
                          <div className="card-footer"></div>
                        </div>
                      </div>
                    </div>
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

export default OrderDetails;
