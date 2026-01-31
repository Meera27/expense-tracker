import React from 'react'
import ThemeController from './ThemeController'
import Link from 'next/link'

const Navbar = () => {
  return (
    <>
        <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 z-1 mt-3 w-52 p-2">
        <li><a>Add Product</a></li>
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  {/* <div className="navbar-center hidden lg:flex"> */}
  {/* </div> */}
  <div className="navbar-end">
    <ThemeController />
    <ul className="menu menu-horizontal px-1">
      <li><Link href='/AddProduct'>Add Product</Link></li>
    </ul>
    <a className="btn mx-3">Button</a>
  </div>
</div>
    </>
  )
}

export default Navbar