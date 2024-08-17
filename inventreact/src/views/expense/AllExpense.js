import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { cilArrowLeft } from '@coreui/icons';
import CIcon from '@coreui/icons-react'

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

   useEffect(() => {
    const allExpense = () => {
      axios.get('http://127.0.0.1:8000/api/v1/expense')
        .then(({ data }) => setExpenses(data))
        .catch(error => console.error(error));
    };

    allExpense();
  }, []);

  const fetchExpenses = () => {
    axios.get('/api/expense/')
      .then(response => setExpenses(response.data))
      .catch(error => console.error('Error fetching expenses:', error));
  };

  const deleteExpense = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/v1/expense/${id}`);
        setExpenses(expenses.filter(expense => expense.id !== id));
      } catch (error) {
        navigate('/all-expense');
      }
    }
  };

  const filteredExpenses = expenses.filter(expense =>
    expense.details.toLowerCase().replace(/\s+/g, '').includes(searchTerm.toLowerCase().replace(/\s+/g, '')) ||
    expense.amount.toLowerCase().replace(/\s+/g, '').includes(searchTerm.toLowerCase().replace(/\s+/g, '')) ||
    expense.expense_date.toLowerCase().replace(/\s+/g, '').includes(searchTerm.toLowerCase().replace(/\s+/g, ''))
  );

  return (
    <div>
        <div className="row">
            <button className='btn btn-light' style={{ backgroundColor: '#ebc281', width: "180px", color:"#000"}}>
            <Link to="/add-expense" style={{  textDecoration:"none", color:'black'}}>
                <CIcon icon={cilArrowLeft} customClassName="nav-icon" style={{ width: "50px", height:"20px" }} />
                Add Expense
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
              <h6 className="m-0 font-weight-bold text-primary">Expense List</h6>
            </div>
            <div className="table-responsive">
              <table className="table align-items-center table-flush">
                <thead className="thead-light">
                  <tr>
                    <th>Details</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExpenses.map(expense => (
                    <tr key={expense.id}>
                      <td>{expense.details}</td>
                      <td>{expense.amount}</td>
                      <td>{expense.expense_date}</td>
                      <td>
                        <Link to={`/edit-expense/${expense.id}`} className="btn btn-sm btn-primary m-1">Edit</Link>
                        <button
                          onClick={() => deleteExpense(expense.id)}
                          className="btn btn-sm btn-danger"
                        >
                          <span style={{ color: '#ffffff' }}>Delete</span>
                        </button>
                      </td>
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

export default ExpenseList;
