import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import axios from 'axios';

const StockUpdate = () => {
  const [form, setForm] = useState({
    product_quantity: '',
  });
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (!User.loggedIn()) {
      history.push('/');
    } else {
      fetchProduct();
    }
  }, []);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`/api/product/${id}`);
      setForm(data);
    } catch (error) {
      console.error('Error fetching product', error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/stock/update/${id}`, form);
      history.push('/stock');
      Notification.success();
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };

  return (
    <div>
      <div className="row">
        <Link to="/stock" className="btn btn-primary">Go Back</Link>
      </div>

      <div className="row justify-content-center">
        <div className="col-xl-12 col-lg-12 col-md-12">
          <div className="card shadow-sm my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-12">
                  <div className="login-form">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Stock Update</h1>
                    </div>

                    <form className="user" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <div className="form-row">
                          <div className="col-md-12">
                            <label htmlFor="exampleFormControlSelect1">Product Stock</label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputFirstName"
                              placeholder="Enter Your Product Name"
                              name="product_quantity"
                              value={form.product_quantity}
                              onChange={handleChange}
                            />
                            <small className="text-danger">
                              {errors.product_quantity && errors.product_quantity[0]}
                            </small>
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">Update</button>
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

export default StockUpdate;
