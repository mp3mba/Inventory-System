import React, { useState} from 'react'
// import { userRegistration } from '../Auth'; // Import auth functions
import {
  CButton,
  CCard,
  CCardBody,
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
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../axiosConfig';

const Register = () => {

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirm_password, setConfirmPassword] = useState('');
  // const [name, setName] = useState('');

  const[register, setRegister] = useState({
    name:"",
    email: "",
    password:""
  })

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setRegister({ ...login, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      axios.get('/sanctum/csrf-cookie')
      .then(response => {
        axios.post('/signup', register)
        .then(res => {
          if(res.data.status === 200) {
            localStorage.setItem('auth_token', res.data.token);
            localStorage.setItem('auth_name', res.data.username);

            if(res.data.res === 'admin'){
              navigate('/all-employee')
            }
            else{
              navigate('/all-product')
            }
          }
          else {
            alert('wrong credentials')
          }
        })
      })
    } catch (error) {
      console.error('Login failed');
    }
  };

  const handleRegistration = async () => {
    if (password !== confirm_password) {
      console.error('Passwords do not match!!!');
      return;
    }

    try {
      console.log('Data being sent:', { name, email, password, confirm_password }); // Log data
      const user = await userRegistration(name, email, password, confirm_password);
      console.log('Registered user:', user);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };
  
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Name"
                      autoComplete="name"
                      name='name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <small className="text-danger">{errors.name[0]}</small>}
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email" 
                      name='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <small className="text-danger">{errors.email[0]}</small>}
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      name='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <small className="text-danger">{errors.password[0]}</small>}
                  </CInputGroup>
                  {/* <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      name="password_confirmation"
                      value={confirm_password}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </CInputGroup> */}
                  <div className="d-grid">
                    <CButton color="success" onClick={handleRegistration}>Create Account</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
