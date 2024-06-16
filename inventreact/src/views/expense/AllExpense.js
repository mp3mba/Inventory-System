import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { cilArrowLeft } from '@coreui/icons';
import CIcon from '@coreui/icons-react'
// import Swal from 'sweetalert2';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
//   const history = useHistory();

  useEffect(() => {
    // Uncomment and modify if you have authentication logic
    // if (!User.loggedIn()) {
    //   history.push('/');
    // }
    fetchExpenses();
  }, []);

  const fetchExpenses = () => {
    axios.get('/api/expense/')
      .then(response => setExpenses(response.data))
      .catch(error => console.error('Error fetching expenses:', error));
  };

  const deleteExpense = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/api/expense/${id}`)
          .then(() => {
            setExpenses(expenses.filter(expense => expense.id !== id));
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          })
          .catch(error => console.error('Error deleting expense:', error));
      }
    });
  };

//   const filteredExpenses = expenses.filter(expense =>
//     expense.expense_date.includes(searchTerm)
//   );

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
                  {/* {filteredExpenses.map(expense => ( */}
                    <tr key=''>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <Link to='' className="btn btn-sm btn-primary">Edit</Link>
                        <button
                          onClick={() => deleteExpense(expense.id)}
                          className="btn btn-sm btn-danger"
                        >
                          <span style={{ color: '#ffffff' }}>Delete</span>
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

export default ExpenseList;
