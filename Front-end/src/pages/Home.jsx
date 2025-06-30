import React from 'react'
import { Customizeproduct,Customerreview,Followus,NewArrivals,Scrollbar,ShopByCategory,NewTrending } from '../index';
import BlogSection from '../home/blog'
function Home() {
  return (
    <div>
      <Scrollbar />
      <ShopByCategory />
      <Customerreview />
      <NewArrivals />
      <Customizeproduct />
      <NewTrending />
      <Followus /> 
      <BlogSection/>
    </div>
  )
}

export default Home
