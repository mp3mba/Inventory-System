import React from 'react'

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

const routes = [
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/employee/add-employee', name: 'AddEmployee', element: AddEmployee },
  { path: '/employee/all-employee', name: 'ViewEmployee', element: ViewEmployee },
  { path: '/employee/edit-employee/:id', name: 'EditEmployee', element: EditEmployee },
  { path: '/add-supplier', name: 'AddSupplier', element: AddSupplier },
  { path: '/all-supplier', name: 'AllSupplier', element: AllSupplier },
  { path: '/edit-supplier/:id', name: 'EditSupplier', element: EditSupplier },
  { path: '/all-category', name: 'AllCategory', element: AllCategory },
  { path: '/add-category', name: 'AddCategory', element: AddCategory },
  { path: '/edit-category/:id', name: 'EditCategory', element: EditCategory },
  { path: '/add-product', name: 'AddProduct', element: AddProduct },
  { path: '/all-product', name: 'AllProduct', element: AllProduct },
  { path: '/edit-product/:id', name: 'EditProduct', element: EditProduct },
  { path: '/all-customers', name: 'AllCustomer', element: AllCustomer },
  { path: '/add-customers', name: 'AddCustomer', element: AddCustomer },
  { path: '/edit-customers/:id', name: 'EditCustomer', element: EditCustomer },
  { path: '/add-order', name: 'AddOrder', element: AddOrder },
  { path: '/view-order', name: 'ViewOrder', element: ViewOrder },
  { path: '/search-order', name: 'SearchOrder', element: SearchOrder },
  { path: '/add-expense', name: 'AddExpense', element: AddExpense },
  { path: '/all-expense', name: 'AllExpense', element: AllExpense },
  { path: '/edit-expense/:id', name: 'EditExpense', element: EditExpense },
  { path: '/point-of-sale', name: 'POS', element: POS },
  { path: '/stock', name: 'Stock', element: Stock },
  { path: '/stock-edit', name: 'StockEdit', element: StockEdit },
  { path: '/login', name: 'Login', element: Login },
  { path: '/registration', name: 'Registration', element: Registration },
]

export default routes
