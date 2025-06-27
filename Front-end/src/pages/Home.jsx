import React from 'react'
import { Customizeproduct,Customerreview,Followus,Newarrival,Scrollbar,ShopByCategory,TrendingProduct } from '../index';
function Home() {
  return (
    <div>
      <Scrollbar />
      <ShopByCategory />
      <Newarrival />
      <Customizeproduct />
      <TrendingProduct />
      <Customerreview />
      <Followus /> 
    </div>
  )
}

export default Home
