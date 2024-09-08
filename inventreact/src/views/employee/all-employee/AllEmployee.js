import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { cilArrowLeft } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import axios from '../../../axiosConfig';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    allEmployee();
  }, []);

  const allEmployee = async () => {
    try {
      const { data } = await axios.get('/employee');
      setEmployees(data);
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEmployee = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        const response = await axios.delete(`/employee/${id}`);
        setEmployees(employees.filter(employee => employee.id !== id));
      } catch (error) {
        navigate('/employee/all-employee');
      }
    }
  };

  const checkAuth = async () => {
    try {
      await axios.get('/employee');
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const filterSearch = employees.filter(employee => {
    const search = searchTerm.toLowerCase().replace(/\s+/g, '')
    return (
      employee.name.toLowerCase().replace(/\s+/g, '').includes(search) ||
      employee.email.toLowerCase().replace(/\s+/g, '').includes(search) ||
      employee.phone.toLowerCase().replace(/\s+/g, '').includes(search) ||
      employee.address.toLowerCase().replace(/\s+/g, '').includes(search)
    );
  });

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
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Salary</th>
                    <th>Address</th>
                    <th>Photo</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filterSearch.map(employee => (
                    <tr key={employee.id}>
                      <td>{employee.name}</td>
                      <td>{employee.email}</td>
                      <td>{employee.phone}</td>
                      <td>{employee.sallery}</td>
                      <td>{employee.address}</td>
                      <td><img src={`http://127.0.0.1:8000/storage/${employee.photo}`} alt="img" id="em_photo" style={{ height: '50px', width: '50px' }} /></td>
                      <td>
                        <Link to={`/employee/edit-employee/${employee.id}`} className="btn btn-sm btn-primary m-1">Edit</Link>
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
