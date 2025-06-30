import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { FavoriteProvider } from "./context/FavoriteContext";
import ProductPage from "./pages/productpage";
import {
  Layout,
  PromoSection ,
  Home,
  MyOrders,
  AccountDashboard,
  AccountInformation,
  AddressBook,
  Dashboard,
  ReviewCard,
  ReviewSummary,
  Reviews,
  RatingStars,
  Customerreview,
  Customizeproduct,
  Followus,
  NewArrivals,
  Scrollbar,
  ShopByCategory,
  NewTrending,
} from "./index";
import { Toaster } from "react-hot-toast";
import FavoritesPage from "./pages/Favpage"; 
import CartPage from "./pages/Cart";        

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
              <Route path="follow-us" element={<Followus />} />
              <Route path="product/:id" element={<ProductPage />} />
              <Route path="new-arrival" element={<NewArrivals />} />
              <Route path="scrollbar" element={<Scrollbar />} />
              <Route path="favoritespage" element={<FavoritesPage />} /> 
              <Route path="cartpage" element={<CartPage />} />             
              <Route path="shop-by-category" element={<ShopByCategory />} />
              <Route path="trending-product" element={<NewTrending />} />
              <Route path="promo-section" element={< PromoSection/>} />
              <Route path="review-card" element={< ReviewCard/>} />
              <Route path="review-summary" element={< ReviewSummary/>} />
              <Route path="review-rating" element={<  RatingStars/>} />
              <Route path="reviews/:id" element={< Reviews/>} />
              <Route path="dashboard" element={<  Dashboard/>} />
              <Route path="myorders" element={<  MyOrders/>} />
              <Route path="account-dashboard" element={<  AccountDashboard/>} />
              <Route path="account-information" element={<  AccountInformation/>} />
              <Route path="address-book" element={<  AddressBook/>} />
            </Route>
          </Routes>
          <Toaster position="top-right" />
        </>
      </FavoriteProvider>
    </CartProvider>
  );
}

export default App;
