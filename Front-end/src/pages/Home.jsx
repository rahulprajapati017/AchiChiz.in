import React from 'react'
import { Customizeproduct,Customerreview,Followus,NewArrivals,Scrollbar,ShopByCategory,NewTrending } from '../index';
function Home() {
  return (
    <div>
      <Scrollbar />
      <ShopByCategory />
      <NewArrivals />
      <Customizeproduct />
      <NewTrending />
      <Customerreview />
      <Followus /> 
    </div>
  )
}

export default Home
