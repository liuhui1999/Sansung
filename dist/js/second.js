console.log("加载成功");
require.config({
    paths:{
        "jquery":"jquery-1.11.3",
        "jquery-cookie":"jquery.cookie",
        "banner":"banner",
        "nav":"nav"
       
    },
    shim:{
        //设置依赖关系
    "jquery-cookie":["jquery"]
    }
})

require(['banner','nav'],function(banner,nav){
    banner.addbanner();
    banner.adddownload();
    banner.topNavTab();
    banner.topDownLoadShopping();
    banner.topDownLoadShoppingtab();
    nav.navdata();
})