import React, {Suspense} from 'react'
import { CSpinner } from '@coreui/react'
import { Navigate } from 'react-router-dom'

// Helper function to check if user is authenticated
// const isAuthenticated = () => !!localStorage.getItem('token')
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  // console.log("Is Authenticated:", !!token);
  return !!token;
}

// Protected route component
const ProtectedRoute = ({ component: Component, ...rest }) => {
  return isAuthenticated() ? (
    <Suspense fallback={
      <div className="pt-3 text-center">
        <CSpinner color="primary" variant="grow" />
      </div>
    }>
      <Component {...rest} />
    </Suspense>
  ) : (
    <Navigate to="/login" replace />
  )
}

// Component for wildcard route redirect
const RedirectTo404 = () => {
  return <Navigate to="/404" replace />;
};

//Dashboard
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Employee
const AddEmployee = React.lazy(() => import('./views/employee/add-employee/AddEmployee'))
const ViewEmployee = React.lazy(() => import('./views/employee/all-employee/AllEmployee'))
const EditEmployee = React.lazy(() => import('./views/employee/edit-employee'))

//Suppliers
const AddSupplier = React.lazy(() => import("./views/supplier/AddSupplier"))
const AllSupplier = React.lazy(() => import("./views/supplier/AllSupplier"))
const EditSupplier = React.lazy(() => import("./views/supplier/EditSupplier"))

//category
const AddCategory = React.lazy(() => import("./views/category/AddCategory"))
const AllCategory = React.lazy(() => import("./views/category/AllCategory"))
const EditCategory = React.lazy(() => import("./views/category/EditCategory"))

//product
const AddProduct = React.lazy(() => import('./views/product/add-product'))
const AllProduct = React.lazy(() => import('./views/product/all-product'))
const EditProduct = React.lazy(() => import('./views/product/EditProduct'))

//Customers
const AddCustomer = React.lazy(() => import('./views/Customer/AddCustomer'))
const AllCustomer = React.lazy(() => import('./views/Customer/AllCustomer'))
const EditCustomer = React.lazy(() => import('./views/Customer/EditCustomer'))

//Orders
const AddOrder = React.lazy(() => import('./views/orders/AddOrder'))
const ViewOrder = React.lazy(() => import('./views/orders/ViewOrder'))
const SearchOrder = React.lazy(() => import('./views/orders/SearchOrder'))

//Expenses
const AddExpense = React.lazy(() => import('./views/expense/AddExpense'))
const AllExpense = React.lazy(() => import('./views/expense/AllExpense'))
const EditExpense = React.lazy(() => import('./views/expense/EditExpense'))

//POS
const POS = React.lazy(() => import('./views/pos/pos'))

//Stock
const Stock = React.lazy(() => import('./views/stock/stock'))
const StockEdit = React.lazy(() => import('./views/stock/edit-stock'))

//Login
const Login = React.lazy(() => import('./views/pages/login/Login'))

//Registration
const Registration = React.lazy(() => import('./views/pages/register/Register'))

//Not Found
const NotFound = React.lazy(() => import('./views/pages/page404/Page404'))

const routes = [
  { path: '/dashboard', 
    name: 'Dashboard', 
    element: (props) => <ProtectedRoute component={Dashboard} {...props} />
  },
  { path: '/employee/add-employee',
    name: 'AddEmployee', 
    element: (props) => <ProtectedRoute component={AddEmployee} {...props} /> 
  },
  { path: '/employee/all-employee', 
    name: 'ViewEmployee', 
    element: (props) => <ProtectedRoute component={ViewEmployee} {...props} /> 
  },
  { path: '/employee/edit-employee/:id', 
    name: 'EditEmployee', 
    element: (props) => <ProtectedRoute component={EditEmployee} {...props} /> 
  },
  { path: '/add-supplier', 
    name: 'AddSupplier', 
    element: (props) => <ProtectedRoute component={AddSupplier} {...props} /> 
  },
  { path: '/all-supplier', 
    name: 'AllSupplier', 
    element: (props) => <ProtectedRoute component={AllSupplier} {...props} /> 
  },
  { path: '/edit-supplier/:id', 
    name: 'EditSupplier', 
    element: (props) => <ProtectedRoute component={EditSupplier} {...props} /> 
  },
  { path: '/all-category', 
    name: 'AllCategory', 
    element: (props) => <ProtectedRoute component={AllCategory} {...props} /> 
  },
  { path: '/add-category', 
    name: 'AddCategory', 
    element: (props) => <ProtectedRoute component={AddCategory} {...props} /> 
  },
  { path: '/edit-category/:id', 
    name: 'EditCategory', 
    element: (props) => <ProtectedRoute component={EditCategory} {...props} /> 
  },
  { path: '/add-product', 
    name: 'AddProduct', 
    element: (props) => <ProtectedRoute component={AddProduct} {...props} /> 
  },
  { path: '/all-product', 
    name: 'AllProduct', 
    element: AllProduct 
  },
  { path: '/edit-product/:id', 
    name: 'EditProduct', 
    element: (props) => <ProtectedRoute component={EditProduct} {...props} /> 
  },
  { path: '/all-customers', 
    name: 'AllCustomer', 
    element: (props) => <ProtectedRoute component={AllCustomer} {...props} />
  },
  { path: '/add-customers', 
    name: 'AddCustomer', 
    element: (props) => <ProtectedRoute component={AddCustomer} {...props} />
  },
  { path: '/edit-customers/:id', 
    name: 'EditCustomer', 
    element: (props) => <ProtectedRoute component={EditCustomer} {...props} /> 
  },
  { path: '/add-order', 
    name: 'AddOrder', 
    element: (props) => <ProtectedRoute component={AddOrder} {...props} />
  },
  { path: '/view-order', 
    name: 'ViewOrder', 
    element: (props) => <ProtectedRoute component={ViewOrder} {...props} /> 
  },
  { path: '/search-order', 
    name: 'SearchOrder', 
    element: (props) => <ProtectedRoute component={SearchOrder} {...props} />
  },
  { path: '/add-expense', 
    name: 'AddExpense', 
    element: (props) => <ProtectedRoute component={AddExpense} {...props} />
  },
  { path: '/all-expense', 
    name: 'AllExpense', 
    element: (props) => <ProtectedRoute component={AllExpense} {...props} /> 
  },
  { path: '/edit-expense/:id', 
    name: 'EditExpense', 
    element: (props) => <ProtectedRoute component={EditExpense} {...props} /> 
  },
  { path: '/point-of-sale', 
    name: 'POS', 
    element: (props) => <ProtectedRoute component={POS} {...props} />
  },
  { path: '/stock', 
    name: 'Stock', 
    element: (props) => <ProtectedRoute component={Stock} {...props} /> 
  },
  { path: '/stock-edit', 
    name: 'StockEdit', 
    element: (props) => <ProtectedRoute component={StockEdit} {...props} /> 
  },
  { path: '/login', 
    name: 'Login', 
    element: Login 
  },
  { path: '/registration', 
    name: 'Registration', 
    element: Registration
  },
  { 
    path: '/404', 
    element: (props) => <ProtectedRoute component={NotFound} {...props} /> 
  },
  { 
    path: '*', 
    element: (props) => <ProtectedRoute component={RedirectTo404} {...props} /> 
  },
]

export default routes
