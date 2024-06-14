import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Features',
  },
  {
    component: CNavGroup,
    name: 'Employee',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Employee',
        to: '/employee/add-employee',
      },
      {
        component: CNavItem,
        name: 'View All employees',
        to: '/employee/all-employee',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Suppliers',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Supplier',
        to: '/add-supplier',
      },
      {
        component: CNavItem,
        name: 'View All Supplier',
        to: '/all-supplier',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Category',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Category',
        to: '/add-category',
      },
      {
        component: CNavItem,
        name: 'View ALl Categories',
        to: '/all-category',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Products',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Product',
        to: '/add-product',
      },
      {
        component: CNavItem,
        name: 'View ALl Product',
        to: '/all-product',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Customers',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Customer',
        to: '/icons/coreui-icons',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        component: CNavItem,
        name: 'View ALl Customer',
        to: '/icons/flags',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Orders',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Orders',
        to: '/icons/coreui-icons',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        component: CNavItem,
        name: 'View ALl Orders',
        to: '/icons/flags',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Expense',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Expense',
        to: '/notifications/alerts',
      },
      {
        component: CNavItem,
        name: 'View ALl Expense',
        to: '/notifications/badges',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Stock',
    to: '/widgets',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: 'Login',
  //   to: '/login',
  // },
  // {
  //   component: CNavItem,
  //   name: 'Register',
  //   to: '/register',
  // },
  // {
  //   component: CNavItem,
  //   name: 'Error 404',
  //   to: '/404',
  // },
  // {
  //   component: CNavItem,
  //   name: 'Error 500',
  //   to: '/500',
  // },
]

export default _nav
