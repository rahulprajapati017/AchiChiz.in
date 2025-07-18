const BASE_URL="http://localhost:3000/api/v1"
// const BASE_URL="https://backend-4-is8o.onrender.com/api/v1"

export const auth={
    SIGNUP_BY_EMAIL:BASE_URL+"/signup",
    LOGIN_BY_EMAIL:BASE_URL+"/login",
    VERIFY_OTP:BASE_URL+"/verify",
    FORGOT_OTP_VERIFY:BASE_URL+"/forgototpverify",
    USER_AUTHORIZATION_FOR_PROFILE:BASE_URL+"/User",
    UPDATE_USER_DATA:BASE_URL+"/updateUserProfile",
    getAllBlogs: BASE_URL + "/getAllBlogs",
    getSingleBlogById: BASE_URL + "/getSingleBlogById",
  commentOnBlog: BASE_URL + "/commentOnBlog",
  GET_USER_PROFILE:BASE_URL+"/userProfile",
  CONTACT_US:BASE_URL+"/createContact",
  FORGOT_PASSWORD:BASE_URL+"/forgotPassword",
  RESET_PASSWORD:BASE_URL+"/resetPassword",
  
  
  
}
export const product={
  REFUND_REQUEST:BASE_URL+"/refund-request",
    APPROVED_PRODUCTS_FOR_HOME:BASE_URL+"/fileUpload/getAllProductsforHome",
    GET_SINGLE_PRODUCT:BASE_URL+"/fileUpload/getSingleProductById",
    ADD_TO_CART:BASE_URL+"/addtocart",
    REMOVE_FROM_CART:BASE_URL+"/removeitem",
    ADD_TO_WISHLIST:BASE_URL+"/addtowishlist",
    REMOVE_FROM_WISHLIST:BASE_URL+"/removefromwishlist",
    GET_ALL_PRODUCT:BASE_URL+"/fileUpload/getallproductforcategory",
    CREATE_ORDER:BASE_URL+"/createOrder",
    GET_BANNERS:BASE_URL+"/admin/getAllBanner",
    GET_ALL_REVIEWS:BASE_URL+"/getAllReviews",
    DELETE_REVIEW:BASE_URL+"/deleteReview",
    CREATEING_REVIEWS:BASE_URL+"/createRating",
    GET_SINGLE_ORDER:BASE_URL+"/getSingleOrder",
    // BLOG_API:BASE_URL+ "/getAllBlogs"
    
    ADMIN_CREATED_CATEGORIES:BASE_URL+"/admin/getAllCategories"
}
export const address={
  CREATE_ADDRESS:BASE_URL+"/address/create",
  GET_ADDRESSES:BASE_URL+"/address/getaddress",
  UPDATE_ADDRESS:BASE_URL+"/address/updateaddress",
  DELETE_ADDRESS:BASE_URL+"/address/deleteaddress",
  SET_DEFAULT_ADDRESS:BASE_URL+"/address",
}


