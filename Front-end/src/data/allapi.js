const BASE_URL="http://localhost:3000/api/v1"

export const auth={
    SIGNUP_BY_EMAIL:BASE_URL+"/signup",
    LOGIN_BY_EMAIL:BASE_URL+"/login",
    VERIFY_OTP:BASE_URL+"/verify",
    USER_AUTHORIZATION_FOR_PROFILE:BASE_URL+"/User",
    UPDATE_USER_DATA:BASE_URL+"/updateUserProfile",
    getAllBlogs: BASE_URL + "/getAllBlogs",
    getSingleBlogById: BASE_URL + "/getSingleBlogById",
  commentOnBlog: BASE_URL + "/commentOnBlog",

    
 
}
export const product={
    APPROVED_PRODUCTS_FOR_HOME:BASE_URL+"/fileUpload/getAllProductsforHome",
    GET_SINGLE_PRODUCT:BASE_URL+"/fileUpload/getSingleProductById",
    ADD_TO_CART:BASE_URL+"/addtocart",
    REMOVE_FROM_CART:BASE_URL+"/removeitem",
    ADD_TO_WISHLIST:BASE_URL+"/addtowishlist",
    REMOVE_FROM_WISHLIST:BASE_URL+"/removefromwishlist",
    GET_ALL_PRODUCT:BASE_URL+"/fileUpload/getallproductforcategory",
    // BLOG_API:BASE_URL+ "/getAllBlogs"
    
}

