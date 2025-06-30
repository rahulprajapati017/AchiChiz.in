import React from 'react'
import { Customizeproduct,Customerreview, PromoSection ,Followus,NewArrivals,Scrollbar,ShopByCategory,NewTrending } from '../index';
function Home() {
  return (
    <div>
      <Scrollbar />
      <ShopByCategory />
      <Customerreview />
      <Followus /> 
      < PromoSection />
      <NewArrivals />
      <Customizeproduct />
      <NewTrending />
    </div>
  )
}

export default Home
