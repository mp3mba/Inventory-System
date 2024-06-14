import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cilArrowLeft } from '@coreui/icons';
import CIcon from '@coreui/icons-react'
// import axios from 'axios';
// import Swal from 'sweetalert2';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const history = useHistory();

  useEffect(() => {
    checkAuth();
    allEmployee();
  }, []);

  const allEmployee = async () => {
    try {
      // const { data } = await axios.get('/api/employee/');
      // setEmployees(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEmployee = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.value) {
        try {
          await axios.delete(`/api/employee/${id}`);
          setEmployees(employees.filter(employee => employee.id !== id));
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        } catch (error) {
          console.error(error);
          history.push('/employee');
        }
      }
    });
  };

  const checkAuth = async () => {
    try {
      await axios.get('/api/employee');
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const filterSearch = employees.filter(employee => employee.name.includes(searchTerm));

  return (
    <div>
      <div className="row">
        <button className='btn btn-light' style={{ backgroundColor: '#ebc281', width: "180px", color:"#000"}}>
          <Link to="/employee/add-employee" style={{  textDecoration:"none", color:'black'}}>
            <CIcon icon={cilArrowLeft} customClassName="nav-icon" style={{ width: "50px", height:"20px" }} />
              Add Employee
          </Link>
        </button>
      </div>
      <br />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control"
        style={{ width: '300px' }}
        placeholder="Search Here"
      />
      <br />
      <div className="row">
        <div className="col-lg-12 mb-4">
          <div className="card">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Employee List</h6>
            </div>
            <div className="table-responsive">
              <table className="table align-items-center table-flush">
                <thead className="thead-light">
                  <tr>
                    <th>Name</th>
                    <th>Photo</th>
                    <th>Phone</th>
                    <th>Salary</th>
                    <th>Joining Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filterSearch.map(employee => (
                    <tr key={employee.id}>
                      <td>{employee.name}</td>
                      <td><img src={employee.photo} alt="Employee" id="em_photo" /></td>
                      <td>{employee.phone}</td>
                      <td>{employee.salary}</td>
                      <td>{employee.joining_date}</td>
                      <td>
                        <Link to={{ pathname: `/edit-employee/${employee.id}`, state: { id: employee.id } }} className="btn btn-sm btn-primary">Edit</Link>
                        <button onClick={() => deleteEmployee(employee.id)} className="btn btn-sm btn-danger"><font color="#ffffff">Delete</font></button>
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

export default EmployeeList;
