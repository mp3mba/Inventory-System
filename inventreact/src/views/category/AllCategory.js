import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from '../../axiosConfig';
import { cilArrowLeft } from '@coreui/icons';
import { BarLoader } from 'react-spinners';
import CIcon from '@coreui/icons-react'

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    allCategory();
  }, []);

  const allCategory = async () => {
    try{
      const { data } = await axios.get('/category')
      setCategories(data)
      setLoading(false)
    }
    catch (error) {
      console.error("Error fetching Categories", error);
      setLoading(false)
    }
  };

  const deleteCategory = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        const response = await axios.delete(`/category/${id}`);
        setCategories(categories.filter(category => category.id !== id));
      } catch (error) {
        navigate('/all-category');
      }
    }
  };

  const filterSearch = categories.filter(category => {
    const search = searchTerm.toLowerCase().replace(/\s+/g, '')
    return (
      category.category_name.toLowerCase().replace(/\s+/g, '').includes(search)
    );
  });

  return (
    <div>
       <div className="row">
            <button className='btn btn-light' style={{ backgroundColor: '#ebc281', width: "185px", color:"#000"}}>
                <Link to="/add-product" style={{  textDecoration:"none", color:'black'}}>
                    <CIcon icon={cilArrowLeft} customClassName="nav-icon" style={{ width: "50px", height:"20px" }} />
                    Add Categories
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
              <h6 className="m-0 font-weight-bold text-primary">Category List</h6>
            </div>
            <div className="table-responsive">
              <table className="table align-items-center table-flush">
                <thead className="thead-light">
                  <tr>
                    <th>Category Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7" style={{ padding: '20px', display: 'flex', justifyContent: 'center'}}>
                        <BarLoader color="#0000FF" width="850" />
                      </td>
                    </tr>
                  ) : (
                  filterSearch.map(category => (
                    <tr key={category.id}>
                      <td>{category.category_name}</td>
                      <td>
                        <Link to={`/edit-category/${category.id}`} className="btn btn-sm btn-primary m-1">Edit</Link>
                        <button onClick={() => deleteCategory(category.id)} className="btn btn-sm btn-danger">
                          <font color="#ffffff">Delete</font>
                        </button>
                      </td>
                    </tr>
                  )
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

export default CategoryList;
