import React from 'react'
import Footer from './Footer'
import Header from './header/Header'

export const Layout = ({children}) => {
  return (
    <div>
        <Header/>
        <main style={{ minHeight: '82vh'}}>{children}</main>
        <Footer/>
    </div>
  )
}


export default Layout 