import React from 'react'
import { Customizeproduct,Customerreview,Followus,Newarrival,Scrollbar,ShopByCategory,TrendingProduct } from '../index';
function Home() {
  return (
    <div>
      <Scrollbar />
      <ShopByCategory />
      <Customerreview />
      <Followus /> 
      <Newarrival />
      <Customizeproduct />
      <TrendingProduct />
    </div>
  )
}

export default Home
