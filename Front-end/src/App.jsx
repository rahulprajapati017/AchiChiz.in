import { Routes, Route } from "react-router-dom";
import { Layout ,Home,Customerreview,Customizeproduct,Followus,Newarrival,Scrollbar,ShopByCategory,TrendingProduct } from "./index";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="customer-review" element={<Customerreview />} />
        <Route path="customize-product" element={<Customizeproduct />} />
        <Route path="follow-us" element={<Followus />} />
        <Route path="new-arrival" element={<Newarrival />} />
        <Route path="scrollbar" element={<Scrollbar />} />
        <Route path="shop-by-category" element={<ShopByCategory />} />
        <Route path="trending-product" element={<TrendingProduct />} />
      </Route>
    </Routes>
  );
}

export default App;
