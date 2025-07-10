<<<<<<< HEAD
const BASE_URL="http://localhost:3000/api/v1"
// const BASE_URL="https://backend-2-d52g.onrender.com/api/v1"
=======
const BASE_URL="https://backend-2-d52g.onrender.com/api/v1"
>>>>>>> ac35eccdc4eb61f5061a1026ed92865a1db889bd

export const auth={
    SIGNUP_BY_EMAIL:BASE_URL+"/signup",
    LOGIN_BY_EMAIL:BASE_URL+"/login",
    VERIFY_OTP:BASE_URL+"/verify",
    USER_AUTHORIZATION_FOR_PROFILE:BASE_URL+"/User",
    UPDATE_USER_DATA:BASE_URL+"/updateUserProfile",
    getAllBlogs: BASE_URL + "/getAllBlogs",
    getSingleBlogById: BASE_URL + "/getSingleBlogById",
  commentOnBlog: BASE_URL + "/commentOnBlog",
  GET_USER_PROFILE:BASE_URL+"/userProfile"

    
 
}
export const product={
    APPROVED_PRODUCTS_FOR_HOME:BASE_URL+"/fileUpload/getAllProductsforHome",
    GET_SINGLE_PRODUCT:BASE_URL+"/fileUpload/getSingleProductById",
    ADD_TO_CART:BASE_URL+"/addtocart",
    REMOVE_FROM_CART:BASE_URL+"/removeitem",
    ADD_TO_WISHLIST:BASE_URL+"/addtowishlist",
    REMOVE_FROM_WISHLIST:BASE_URL+"/removefromwishlist",
    GET_ALL_PRODUCT:BASE_URL+"/fileUpload/getallproductforcategory",
<<<<<<< HEAD
    CREATE_ORDER:BASE_URL+"/createOrder"
=======
>>>>>>> ac35eccdc4eb61f5061a1026ed92865a1db889bd
    // BLOG_API:BASE_URL+ "/getAllBlogs"
    
}

