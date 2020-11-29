// ADMIN_ORDER_MANAGE = AD_ORM
// ADMIN_ORDER_MANAGE_DETAILS = AD_ORM_DETAILS
// ADMIN_ORDER_MANAGE_UPDATE_ORDER_STATE = AD_ORM_ORDER_STATE
// ADMIN_ORDER_MANAGE_SEARCH = AD_ORM_SEARCH

// ADMIN_ACCOUNT_MANAGE = AD_ACM
// ADMIN_ACCOUNT_MANAGE_EDIT = AD_PRM_EDIT
// ADMIN_ACCOUNT_MANAGE_ADD = AD_PRM_ADD
// ADMIN_ACCOUNT_MANAGE_DELETE = AD_PRM_DELETE

// ADMIN_REVENUE_STATISTIC = AD_RES

// ADMIN_PRODUCT_MANAGE = AD_PRM
// ADMIN_PRODUCT_MANAGE_ADD = AD_PRM_ADD
// ADMIN_PRODUCT_MANAGE_EDIT = AD_PRM_EDIT
// ADMIN_PRODUCT_MANAGE_DELETE = AD_PRM_DEL

module.exports = {
    SHRT_DF_LINK: '/',
    DF_LINK: '/api/v1/',

    //api for admin
    DF_AD : "/admin",
    
    AD_ORM : "/order",
    AD_ORM_DETAILS : "/order/details",
    AD_ORM_ORDER_STATE : "/order/orderstate",
    AD_ORM_SEARCH : "/order/search",

    AD_ACM : "/account",
    AD_PRM_ADD: "/account/add",
    AD_PRM_DELETE: "/account/delete",
    AD_PRM_ADD: "/account/edit",

    AD_RES : "/revenue",
    AD_RES_CUSTOMER : "/revenue/cus",
    AD_RES_PRODUCTTYPE : "/revenue/producttype",

    AD_PRM : "/products",
    AD_PRM_ADD : "/product/add",
    AD_PRM_EDIT : "/product/edit",
    AD_PRM_DEL : "/product/delete",

    AD_PERMISSION : '/permission',
    //api share for both admin and customers 
    DF_SHARED : '/_shared',

    SHARED_LOGIN : "/login",
    SHARED_LOGOUT : "/logout",
    SHARED_PROFILE : "/profile",
    SHARED_RESETPASSWORD : "/reset-password",
 
    //api for customers
    DF_CUS : '/customer',
    CUS_REGISTER : "/register",
    CUS_REGISTER_FAILED : "/register/fail",
    CUS_REGISTER_SUCCESS : "/register/success",
    
    CUS_CARTMANAGER : "/cartmanager",
    CUS_CARTMANAGER_ADD : "/cartmanager/add",
    CUS_CARTMANAGER_REMOVE : "/cartmanager/remove",
    CUS_CARTMANAGER_EDIT : "/cartmanager/edit",

    CUS_PURCHASE : "/purchase",

    CUS_ORDERTRACE : "/ordertrace",
    CUS_ORDERTRACE_REORDER : "/ordertrace/reorder",
    CUS_ORDERTRACE_REVIEW : "/ordertrace/review",
    CUS_ORDERTRACE_CANCEL : "/ordertrace/cancel",

    CUS_PRODUCT_DETAILS : "/product_details",

    CUS_SEARCH_PRODUCT : "/search",
    CUS_SEARCH_PRODUCT_NAME : "/search/name",
    CUS_SEARCH_PRODUCT_TYPE : "/search/type",

}