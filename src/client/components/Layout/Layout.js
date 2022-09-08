import React from 'react'
import Footer from './Footer'
// import Navbar from './Navbar'

export const Layout = ({children}) => {
  return (
    <div>
        {/* <Navbar/> */}
        <main style={{ minHeight: '82vh'}}>{children}</main>
        <Footer/>
    </div>
  )
}


export default Layout 