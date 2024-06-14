import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import Swal from 'sweetalert2';
import { cilArrowLeft } from '@coreui/icons';
import CIcon from '@coreui/icons-react'

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
//   const history = useHistory();

  // Uncomment and modify if you have authentication logic
  // useEffect(() => {
  //   if (!User.loggedIn()) {
  //     history.push('/');
  //   }
  // }, [history]);

  useEffect(() => {
    allCategory();
  }, []);

  const allCategory = () => {
    axios.get('/api/category/')
      .then(({ data }) => setCategories(data))
      .catch(err => console.error(err));
  };

  const deleteCategory = (id) => {
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
        axios.delete(`/api/category/${id}`)
          .then(() => {
            setCategories(categories.filter(category => category.id !== id));
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          })
          .catch(() => {
            history.push('/category');
          });
      }
    });
  };

//   const filterSearch = categories.filter(category => {
//     return category.category_name.toLowerCase().includes(searchTerm.toLowerCase());
//   });

  return (
    <div>
       <div className="row">
            <button className='btn btn-light' style={{ backgroundColor: '#ebc281', width: "180px", color:"#000"}}>
                <Link to="/add-supplier" style={{  textDecoration:"none", color:'black'}}>
                    <CIcon icon={cilArrowLeft} customClassName="nav-icon" style={{ width: "50px", height:"20px" }} />
                    All Categories
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
                  {/* {filterSearch.map(category => ( */}
                    <tr key=''>
                      <td></td>
                      <td>
                        <Link to='' className="btn btn-sm btn-primary">Edit</Link>
                        <button onClick={() => deleteCategory(category.id)} className="btn btn-sm btn-danger">
                          <font color="#ffffff">Delete</font>
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

export default CategoryList;
