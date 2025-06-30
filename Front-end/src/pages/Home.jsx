import React from 'react'
import { Customizeproduct,Customerreview, PromoSection ,Followus,NewArrivals,Scrollbar,ShopByCategory,NewTrending } from '../index';
function Home() {
  return (
    <div>
      <Scrollbar />
      <ShopByCategory />
      <Customizeproduct />
      <Customerreview />
      <Followus /> 
      < PromoSection />
      <NewArrivals />
      <Customizeproduct />
      <NewTrending />
      <Followus /> 
      <BlogSection/>
    </div>
  )
}

export default Home
