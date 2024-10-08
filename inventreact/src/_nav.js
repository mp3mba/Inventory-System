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
        name: 'View All Categories',
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
        name: 'View All Product',
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
        to: '/add-customers',
      },
      {
        component: CNavItem,
        name: 'View All Customer',
        to: '/all-customers',
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
        to: '/add-order',
      },
      {
        component: CNavItem,
        name: 'View Order',
        to: '/view-order',
      },
      {
        component: CNavItem,
        name: 'Search Orders',
        to: '/search-order',
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
        to: '/add-expense',
      },
      {
        component: CNavItem,
        name: 'View All Expense',
        to: '/all-expense',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Stock',
    to: '/stock',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  },
]

export default _nav
