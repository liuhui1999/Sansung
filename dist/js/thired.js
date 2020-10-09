console.log("加载成功");
require.config({
    paths:{
        "jquery":"jquery-1.11.3",
        "jquery-cookie":"jquery.cookie",
        "banner":"banner",
        "nav":"nav",
        "settlement":"settlement"
    },
    shim:{
        //设置依赖关系
    "jquery-cookie":["jquery"]
    }
})

require(['banner','settlement'],function(banner,settlement){
    banner.addbanner();
    banner.adddownload();
    banner.topNavTab();
    banner.topDownLoadShopping();
    banner.topDownLoadShoppingtab();
    settlement.shopListDown();
    settlement.Download();
    settlement.loadCarData();
    settlement.checkFunc();
    settlement.changeCars();
})