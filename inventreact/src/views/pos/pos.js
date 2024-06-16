import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { cilArrowLeft } from '@coreui/icons';
import CIcon from '@coreui/icons-react'

const PosDashboard = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [carts, setCarts] = useState([]);
  const [vats, setVats] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [getSearchTerm, setGetSearchTerm] = useState('');
  const [form, setForm] = useState({
    customer_id: '',
    pay: '',
    due: '',
    payby: 'HandCash'
  });
//   const history = useHistory();

  useEffect(() => {
    // Uncomment and modify if you have authentication logic
    // if (!User.loggedIn()) {
    //   history.push('/');
    // }
    allProduct();
    allCategory();
    allCustomer();
    cartProduct();
    vat();
  }, []);

  const allProduct = () => {
    axios.get('/api/product/')
      .then(({ data }) => setProducts(data))
      .catch();
  };

  const allCategory = () => {
    axios.get('/api/category/')
      .then(({ data }) => setCategories(data))
      .catch();
  };

  const allCustomer = () => {
    axios.get('/api/customer/')
      .then(({ data }) => setCustomers(data))
      .catch(console.log('error'));
  };

  const cartProduct = () => {
    axios.get('/api/cart/product/')
      .then(({ data }) => setCarts(data))
      .catch();
  };

  const vat = () => {
    axios.get('/api/vats/')
      .then(({ data }) => setVats(data))
      .catch();
  };

  const addToCart = (id) => {
    axios.get(`/api/addToCart/${id}`)
      .then(() => {
        cartProduct();
        // Notification.cart_success() // Replace with your notification logic
      })
      .catch();
  };

  const removeItem = (id) => {
    axios.get(`/api/remove/cart/${id}`)
      .then(() => {
        cartProduct();
        // Notification.cart_delete() // Replace with your notification logic
      })
      .catch();
  };

  const increment = (id) => {
    axios.get(`/api/increment/${id}`)
      .then(() => {
        cartProduct();
        // Notification.success() // Replace with your notification logic
      })
      .catch();
  };

  const decrement = (id) => {
    axios.get(`/api/decrement/${id}`)
      .then(() => {
        cartProduct();
        // Notification.success() // Replace with your notification logic
      })
      .catch();
  };

  const orderDone = (e) => {
    e.preventDefault();
    let total = (subtotal * vats.vat) / 100 + subtotal;
    let data = { ...form, qty: qty, subtotal: subtotal, vat: vats.vat, total: total };

    axios.post('/api/orderdone', data)
      .then(() => {
        // Notification.success() // Replace with your notification logic
        history.push('/home');
      });
  };

//   const filterSearch = products.filter(product => product.product_name.match(searchTerm));
//   const getFilterSearch = products.filter(product => product.product_name.match(getSearchTerm));

//   const qty = carts.reduce((sum, cart) => sum + parseFloat(cart.pro_quantity), 0);
//   const subtotal = carts.reduce((sum, cart) => sum + (parseFloat(cart.pro_quantity) * parseFloat(cart.product_price)), 0);

  return (
    <div>
      <div className="container-fluid" id="container-wrapper">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">POS Dashboard</h1>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">POS</li>
          </ol>
        </div>

        <div className="row mb-3">
          <div className="col-xl-5 col-lg-5">
            <div className="card mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Expense Insert</h6>
                <button className="btn btn-sm btn-info"><font color="#ffffff">Add Customer</font></button>
              </div>
              <div className="table-responsive" style={{ fontSize: '12px' }}>
                <table className="table align-items-center table-flush">
                  <thead className="thead-light">
                    <tr>
                      <th>Name</th>
                      <th>Qty</th>
                      <th>Unit</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {carts.map(cart => ( */}
                      <tr key=''>
                        <td></td>
                        <td>
                          <input type="text" readOnly style={{ width: '15px' }} value='' />
                          <button onClick={() => increment(cart.id)} className="btn btn-sm btn-success">+</button>
                          {/* {cart.pro_quantity >= 2 ? (
                            <button onClick={() => decrement(cart.id)} className="btn btn-sm btn-danger">-</button>
                          ) : (
                            <button className="btn btn-sm btn-danger" disabled>-</button>
                          )} */}
                        </td>
                        <td></td>
                        <td></td>
                        <td>
                          <button onClick={() => removeItem(cart.id)} className="btn btn-sm btn-primary"><font color="#ffffff">X</font></button>
                        </td>
                      </tr>
                    {/* ))} */}
                  </tbody>
                </table>
              </div>
              <div className="card-footer">
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between align-items-center">Total Quantity:
                    <strong></strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">Sub Total:
                    <strong></strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">Vat:
                    <strong>{vats.vat} %</strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">Total:
                    <strong></strong>
                  </li>
                </ul>
                <br />
                <form onSubmit={orderDone}>
                  <label>Customer Name</label>
                  <select className="form-control" value={form.customer_id} onChange={(e) => setForm({ ...form, customer_id: e.target.value })}>
                    {/* {customers.map(customer => (
                      <option key={customer.id} value={customer.id}>{customer.name}</option>
                    ))} */}
                  </select>
                  <label>Pay</label>
                  <input type="text" className="form-control" required value={form.pay} onChange={(e) => setForm({ ...form, pay: e.target.value })} />
                  <label>Due</label>
                  <input type="text" className="form-control" required value={form.due} onChange={(e) => setForm({ ...form, due: e.target.value })} />
                  <label>Pay By</label>
                  <select className="form-control" value={form.payby} onChange={(e) => setForm({ ...form, payby: e.target.value })}>
                    <option value="HandCash">Hand Cash</option>
                    <option value="Cheaque">Cheque</option>
                    <option value="GiftCard">Gift Card</option>
                  </select>
                  <br />
                  <button type="submit" className="btn btn-success">Submit</button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-xl-7 col-lg-7">
            <div className="card mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Products Sold</h6>
              </div>
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">All Product</a>
                </li>
                {/* {categories.map(category => ( */}
                  <li className="nav-item" key=''>
                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false" onClick={() => subproduct(category.id)}></a>
                  </li>
                {/* ))} */}
              </ul>
              <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                  <div className="card-body">
                    <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="form-control" style={{ width: '560px' }} placeholder="Search Product" />
                    <div className="row">
                      {/* {filterSearch.map(product => ( */}
                        <div className="col-lg-3 col-md-3 col-sm-6 col-6" key=''>
                          <button className="btn btn-sm" onClick={() => addToCart(product.id)}>
                            <div className="card" style={{ width: '8.5rem', marginBottom: '5px' }}>
                              <img src='' alt='' className="card-img-top" style={{ height: '100px', width: '135px' }} />
                              <div className="card-body">
                                <h6 className="card-title"></h6>
                                {/* {product.product_quantity >= 1 ? (
                                  <span className="badge badge-success">Available {product.product_quantity}</span>
                                ) : (
                                  <span className="badge badge-danger">Stock Out</span>
                                )} */}
                              </div>
                            </div>
                          </button>
                        </div>
                      {/* ))} */}
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                  <input type="text" value={getSearchTerm} onChange={(e) => setGetSearchTerm(e.target.value)} className="form-control" style={{ width: '560px' }} placeholder="Search Product" />
                  <div className="row">
                    {/* {getFilterSearch.map(product => ( */}
                      <div className="col-lg-3 col-md-3 col-sm-6 col-6" key=''>
                        <button className="btn btn-sm" onClick={() => addToCart(product.id)}>
                          <div className="card" style={{ width: '8.5rem', marginBottom: '5px' }}>
                            <img src='' alt='' className="card-img-top" style={{ height: '100px', width: '135px' }} />
                            <div className="card-body">
                              <h6 className="card-title"></h6>
                              {/* {product.product_quantity >= 1 ? (
                                <span className="badge badge-success">Available {product.product_quantity}</span>
                              ) : (
                                <span className="badge badge-danger">Stock Out</span>
                              )} */}
                            </div>
                          </div>
                        </button>
                      </div>
                    {/* ))} */}
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

export default PosDashboard;
