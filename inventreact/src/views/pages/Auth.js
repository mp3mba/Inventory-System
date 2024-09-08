import axios from '../../axiosConfig';

// Login function
export const login = async (email, password) => {
  try {
    const response = await axios.post('/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response.data);
    throw error;
  }
};

// Registration function
export const userRegistration = async (name, email, password, confirm_password) => {
  try {
    const response = await axios.post('/signup', {
        name,
        email,
        password,
        confirm_password
    });
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response.data);
    throw error;
  }
};

// Logout function
export const logout = async () => {
  try {
    await axios.post('/logout');
  } catch (error) {
    console.error('Logout error:', error.response.data);
  }
};

// Fetch authenticated user
export const getUser = async () => {
  try {
    const response = await axios.get('/user');
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error.response.data);
    throw error;
  }
};
