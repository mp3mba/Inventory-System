import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { cilArrowLeft } from '@coreui/icons';
import CIcon from '@coreui/icons-react'

const AddExpense = () => {
  const [form, setForm] = useState({ details: '', amount: '' });
  const [errors, setErrors] = useState({});
//   const history = useHistory();

  useEffect(() => {
    // Uncomment and modify if you have authentication logic
    // if (!User.loggedIn()) {
    //   history.push('/');
    // }
  }, [history]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const expenseInsert = (e) => {
    e.preventDefault();
    axios.post('/api/expense', form)
      .then(() => {
        history.push('/expense');
        // Replace with your notification logic
        alert('Expense added successfully');
      })
      .catch(error => {
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div>
        <div className="row">
            <button className='btn btn-light' style={{ backgroundColor: '#ebc281', width: "180px", color:"#000"}}>
            <Link to="/all-expense" style={{  textDecoration:"none", color:'black'}}>
                <CIcon icon={cilArrowLeft} customClassName="nav-icon" style={{ width: "50px", height:"20px" }} />
                All Expenses
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
                      <h1 className="h4 text-gray-900 mb-4">Add Expense</h1>
                    </div>

                    <form className="user px-3" onSubmit={expenseInsert}>
                      <div className="form-group mb-3">
                        <div className="row">
                          <div className="col-md-12">
                            <label htmlFor="expenseDetails"><b>Expense Details</b></label>
                            <textarea
                              className="form-control"
                              id="expenseDetails"
                              rows="3"
                              name="details"
                              value={form.details}
                              onChange={handleChange}
                            ></textarea>
                            {errors.details && <small className="text-danger">{errors.details[0]}</small>}
                          </div>

                          <div className="col-md-12"><br />
                            <label htmlFor="expenseAmount"><b>Expense Amount</b></label>
                            <input
                              type="text"
                              className="form-control"
                              id="expenseAmount"
                              placeholder="Enter Your Amount"
                              name="amount"
                              value={form.amount}
                              onChange={handleChange}
                            />
                            {errors.amount && <small className="text-danger">{errors.amount[0]}</small>}
                          </div>
                        </div>
                      </div>

                      <div className="form-group mb-3">
                        <button type="submit" className="btn btn-primary btn-block">Save</button>
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
    </div>
  );
};

export default AddExpense;
