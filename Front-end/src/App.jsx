import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { FavoriteProvider } from "./context/FavoriteContext";
import Productpage from "./pages/productpage.jsx";
import {
  Layout,
  Home,
  Customerreview,
  Customizeproduct,
  Followus,
  NewArrivals,
  Scrollbar,
  ShopByCategory,
  NewTrending,
} from "./index";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <CartProvider>
      <FavoriteProvider>
        <>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="customer-review" element={<Customerreview />} />
              <Route path="customize-product" element={<Customizeproduct />} />
             <Route path="product/:id" element={ <Productpage /> }/>
              <Route path="new-arrival" element={<NewArrivals />} />
              <Route path="scrollbar" element={<Scrollbar />} />
              <Route path="follow-us" element={<Followus />} />
              <Route path="shop-by-category" element={<ShopByCategory />} />
              <Route path="trending-product" element={<NewTrending />} />
            </Route>
          </Routes>
          <Toaster position="top-right" />
        </>
      </FavoriteProvider>
    </CartProvider>
  );
}

export default App;
