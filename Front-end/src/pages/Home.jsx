import React from 'react'
import { Customizeproduct,Customerreview,Followus,NewArrivals,Scrollbar,ShopByCategory,NewTrending } from '../index';
function Home() {
  return (
    <div>
      <Scrollbar />
      <ShopByCategory />
      <Customizeproduct />
      <Customerreview />
      <Followus /> 
      <NewArrivals />
      <Customizeproduct />
      <NewTrending />
    </div>
  )
}

export default Home
