import React from 'react'
import { Customizeproduct,Customerreview,Followus,Newarrival,Scrollbar,ShopByCategory,TrendingProduct } from '../index';
function Home() {
  return (
    <div>
      <Customerreview />
      <Followus /> 
      <Newarrival />
      <Customizeproduct />
      <Scrollbar />
      <ShopByCategory />
      <TrendingProduct />
    </div>
  )
}

export default Home
