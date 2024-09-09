import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../../axiosConfig';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
  const [login, setLogin] = useState({
    email:'',
    password:'',
  })

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('/login', login, {
        withCredentials: true
      });
      localStorage.setItem('token', response.data.access_token);
      navigate('/dashboard')
    } catch (err) {
      setErrors(err)
    }
  };

  const handleInputChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-body-tertiary max-vh-100 d-flex align-items-center justify-content-center" style={{ overflow: 'hidden', marginTop: '100px' }}>
      <CContainer style={{ maxWidth: '400px' }}>
        <CRow className="justify-content-center">
          <CCardGroup>
            <CCard className="p-4" style={{ width: '50%' }}>
              <CCardBody>
                <CForm>
                  <h1>Login</h1>
                  <p className="text-body-secondary">Sign In to your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      name='email'
                      placeholder="Username"
                      autoComplete="username"
                      value={login.email}
                      onChange={handleInputChange}
                    />
                    {errors.email && <small className="text-danger">{errors.email[0]}</small>}
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="current-password"
                      name='password'
                      value={login.password}
                      onChange={handleInputChange}
                    />
                    {errors.password && <small className="text-danger">{errors.password[0]}</small>}
                  </CInputGroup>
                  <CRow>
                    <CCol xs={6}>
                      <CButton color="primary" className="px-4" onClick={handleLogin}>
                        Login
                      </CButton>
                    </CCol>
                    <CCol xs={6} className="text-right">
                      <CButton color="link" className="px-1">
                        Forgot password?
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login