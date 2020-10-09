define(["jquery"],function($){

  function download(){
    banner();
    topDownLoad();
  };
    function banner(){
        var aBtns = $("#banner").find("div span");
        var oUl = $("#banner").find("ul");
        var iNow = 0; //记录要显示的图片的下标
        var timer = null; //轮播效果的定时器

        //给整个轮播图加一个移入移出
        $("#banner")
          .mouseenter(function () {
            clearInterval(timer);
          })
          .mouseleave(function () {
            timer = setInterval(function () {
              iNow++;
              tab();
            }, 2000);
          });

        timer = setInterval(function () {
          iNow++;
          tab();
        }, 2000);

        //给所有的按钮添加点击
        aBtns.click(function () {
          iNow = $(this).index();
          tab();
        });

        function tab() {
          aBtns.removeClass("active").eq(iNow).addClass("active");
          if (iNow == aBtns.size()) {
            aBtns.eq(0).addClass("active");
          }

          oUl.animate({ top: -350 * iNow }, 300, function () {
            if (iNow == aBtns.size()) {
             
              iNow = 0;
              oUl.css("top", 0);
            }
          });

        }
    }
//下载顶部导航数据
          function topDownLoad(){
            $.ajax({
              url:"data/data2.json",
              success:function(result){

               
              
                var topNewArr=result;
                
                for(var i=0;i<topNewArr.length;i++){

                  var node=$(`<ul class="childres-list clearfix"  style="display: ${i==0?"block":"none"}"></ul>`)
                  
                  node.appendTo("#site-header .container")
                  var childAarr=topNewArr[i].childs;
                  for(var j=0;j<childAarr.length;j++){
                    
                    $(` <li>
                    <a href="">
                        <div>
                            <img src="${childAarr[j].img}" alt="">
                        </div>
                        <div class="title">${childAarr[j].title}</div>
                       
                    </a>
                </li>`).appendTo(node);
                  }

                }
              }
            })
          }
          function topNavTab(){
            $("#div2 .nav-list").on("mouseenter",".nav-item",function(){
              $(this).children().addClass("active");
              var index=$(this).index();

              $("#site-header").stop(true).slideDown(1000,function(){
                console.log("下拉结束");
              });

              $("#site-header .container").find("ul").eq(index).css("display","block").siblings("ul").css("display","none");
            })

            $("#div2 .nav-list").on("mouseleave",".nav-item",function(){
              $(this).children().removeClass("active");
              $("#site-header").stop(true).slideUp(1000,function(){
                console.log("上啦结束");
              });
            })
          }



          function topDownLoadShopping(){
            $.ajax({
              url:"data/data.json",
              success:function(result){
                var listName=result.data.mobileItem.lists[0];
                
                for(var i=0;i<listName.categorys.length;i++){  
                  $(`<li class=".nav-item2">${listName.categorys[i].listName}</li>`).appendTo("#mobileItem .categorys .listName");                 
                  var node =$(`
                  <section id="stores"style="display: ${i==0?"block":"none"}" >
                  <div class="leftImg">
                      <a href="">
                          <img src="${listName.categorys[i].floorKv}" alt="">
                      </a>
                  </div>
                  </section>`);
                  var node2 =$(`
                  <div class="rightImg">
                  </div>`);
                  node.appendTo("#mobileItem");
                  node2.appendTo(node);
                  
                  for(j=0;j<listName.categorys[i].items.length;j++){

                   var node3=$(`
                   <a href="${listName.categorys[i].items[j].url}">
                   <img src="${listName.categorys[i].items[j].pcImgpc}" alt="">
                   <p>${listName.categorys[i].items[j].title}</p>
                   <i>${listName.categorys[i].items[j].subtitle}</i>
                   <span>${listName.categorys[i].items[j].listprice}</span>
                   </a>`);
                   node3.appendTo(node2);
                  }
                  
                
                 }
                
               
                  
                  
              }
            })
          }


          function topDownLoadShoppingtab(){

            $("#mobileItem .categorys .listName").on("mouseenter","li",function(){

              
              $(this).addClass("active");
            var index=$(this).index();
            console.log(index);
            console.log($("#stores").le);
            // $("#stores").eq(index).css("display","block").nextAll().css("display","none");
              
            $("#mobileItem").find("section").eq(index).css("display","block").siblings("section").css("display","none");

            })
            $("#mobileItem .categorys .listName").on("mouseleave","li",function(){
              $(this).removeClass("active");
              
            })
          }

          function wearableItem(){
            $.ajax({
              url:"data/data.json",
              success:function(result){
                var listName=result.data.wearableItem.lists[0];
                console.log(listName.categorys[0].items.length);
                for(var i=0;i<listName.categorys.length;i++){  
                  $(`<li class=".nav-item2">${listName.categorys[i].listName}</li>`).appendTo("#wearableItem .categorys .listName");                 
                  var node =$(`
                  <section id="stores"style="display: ${i==0?"block":"none"}" >
                  <div class="leftImg">
                      <a href="">
                          <img src="${listName.categorys[i].floorKv}" alt="">
                      </a>
                  </div>
                  </section>`);
                  var node2 =$(`
                  <div class="rightImg">
                  </div>`);
                  node.appendTo("#wearableItem");
                  node2.appendTo(node);
                  
                  for(j=0;j<listName.categorys[i].items.length;j++){

                   var node3=$(`
                   <a href="${listName.categorys[i].items[j].url}">
                   <img src="${listName.categorys[i].items[j].pcImgpc}" alt="">
                   <p>${listName.categorys[i].items[j].title}</p>
                   <i>${listName.categorys[i].items[j].subtitle}</i>
                   <span>${listName.categorys[i].items[j].listprice}</span>
                   </a>`);
                   node3.appendTo(node2);
                  }
                  
                
                 }
                
               
                  
                  
              }
            })
          }


          function wearableItemtab(){

            $("#wearableItem .categorys .listName").on("mouseenter","li",function(){

              
              $(this).addClass("active");
            var index=$(this).index();
            console.log(index);
            console.log($("#stores").le);
            // $("#stores").eq(index).css("display","block").nextAll().css("display","none");
              
            $("#wearableItem").find("section").eq(index).css("display","block").siblings("section").css("display","none");

            })
            $("#wearableItem .categorys .listName").on("mouseleave","li",function(){
              $(this).removeClass("active");
              
            })
          }
          function ctvItem(){
            $.ajax({
              url:"data/data.json",
              success:function(result){
                var listName=result.data.ctvItem.lists[0];
                console.log(listName.categorys[0].items.length);
                for(var i=0;i<listName.categorys.length;i++){  
                  $(`<li class=".nav-item2">${listName.categorys[i].listName}</li>`).appendTo("#ctvItem .categorys .listName");                 
                  var node =$(`
                  <section id="stores"style="display: ${i==0?"block":"none"}" >
                  <div class="leftImg">
                      <a href="">
                          <img src="${listName.categorys[i].floorKv}" alt="">
                      </a>
                  </div>
                  </section>`);
                  var node2 =$(`
                  <div class="rightImg">
                  </div>`);
                  node.appendTo("#ctvItem");
                  node2.appendTo(node);
                  
                  for(j=0;j<listName.categorys[i].items.length;j++){

                   var node3=$(`
                   <a href="${listName.categorys[i].items[j].url}">
                   <img src="${listName.categorys[i].items[j].pcImgpc}" alt="">
                   <p>${listName.categorys[i].items[j].title}</p>
                   <i>${listName.categorys[i].items[j].subtitle}</i>
                   <span>${listName.categorys[i].items[j].listprice}</span>
                   </a>`);
                   node3.appendTo(node2);
                  }
                  
                
                 }
                
               
                  
                  
              }
            })
          }


          function ctvItemtab(){

            $("#ctvItem .categorys .listName").on("mouseenter","li",function(){

              
              $(this).addClass("active");
            var index=$(this).index();
            console.log(index);
            console.log($("#stores").le);
            // $("#stores").eq(index).css("display","block").nextAll().css("display","none");
              
            $("#ctvItem").find("section").eq(index).css("display","block").siblings("section").css("display","none");

            })
            $("#ctvItem .categorys .listName").on("mouseleave","li",function(){
              $(this).removeClass("active");
              
            })
          }
          
          function computerItem(){
            $.ajax({
              url:"data/data.json",
              success:function(result){
                var listName=result.data.computerItem.lists[0];
                console.log(listName.categorys[0].items.length);
                for(var i=0;i<listName.categorys.length;i++){  
                  $(`<li class=".nav-item2">${listName.categorys[i].listName}</li>`).appendTo("#computerItem .categorys .listName");                 
                  var node =$(`
                  <section id="stores"style="display: ${i==0?"block":"none"}" >
                  <div class="leftImg">
                      <a href="">
                          <img src="${listName.categorys[i].floorKv}" alt="">
                      </a>
                  </div>
                  </section>`);
                  var node2 =$(`
                  <div class="rightImg">
                  </div>`);
                  node.appendTo("#computerItem");
                  node2.appendTo(node);
                  
                  for(j=0;j<listName.categorys[i].items.length;j++){

                   var node3=$(`
                   <a href="${listName.categorys[i].items[j].url}">
                   <img src="${listName.categorys[i].items[j].pcImgpc}" alt="">
                   <p>${listName.categorys[i].items[j].title}</p>
                   <i>${listName.categorys[i].items[j].subtitle}</i>
                   <span>${listName.categorys[i].items[j].listprice}</span>
                   </a>`);
                   node3.appendTo(node2);
                  }
                  
                
                 }
                
               
                  
                  
              }
            })
          }

          function computerItemtab(){

            $("#computerItem .categorys .listName").on("mouseenter","li",function(){

              
              $(this).addClass("active");
            var index=$(this).index();
            console.log(index);
            console.log($("#stores").le);
            // $("#stores").eq(index).css("display","block").nextAll().css("display","none");
              
            $("#computerItem").find("section").eq(index).css("display","block").siblings("section").css("display","none");

            })
            $("#computerItem .categorys .listName").on("mouseleave","li",function(){
              $(this).removeClass("active");
              
            })
          }

          function accessoryItem(){
            $.ajax({
              url:"data/data.json",
              success:function(result){
                var listName=result.data.accessoryItem.lists[0];
                console.log(listName.categorys[0].items.length);
                for(var i=0;i<listName.categorys.length;i++){  
                  $(`<li class=".nav-item2">${listName.categorys[i].listName}</li>`).appendTo("#accessoryItem .categorys .listName");                 
                  var node =$(`
                  <section id="stores"style="display: ${i==0?"block":"none"}" >
                  <div class="leftImg">
                      <a href="">
                          <img src="${listName.categorys[i].floorKv}" alt="">
                      </a>
                  </div>
                  </section>`);
                  var node2 =$(`
                  <div class="rightImg">
                  </div>`);
                  node.appendTo("#accessoryItem");
                  node2.appendTo(node);
                  
                  for(j=0;j<listName.categorys[i].items.length;j++){

                   var node3=$(`
                   <a href="${listName.categorys[i].items[j].url}">
                   <img src="${listName.categorys[i].items[j].pcImgpc}" alt="">
                   <p>${listName.categorys[i].items[j].title}</p>
                   <i>${listName.categorys[i].items[j].subtitle}</i>
                   <span>${listName.categorys[i].items[j].listprice}</span>
                   </a>`);
                   node3.appendTo(node2);
                  }
                  
                
                 }
                
               
                  
                  
              }
            })
          }

          function accessoryItemtab(){

            $("#accessoryItem .categorys .listName").on("mouseenter","li",function(){

              
              $(this).addClass("active");
            var index=$(this).index();
            console.log(index);
            console.log($("#stores").le);
            // $("#stores").eq(index).css("display","block").nextAll().css("display","none");
              
            $("#accessoryItem").find("section").eq(index).css("display","block").siblings("section").css("display","none");

            })
            $("#accessoryItem .categorys .listName").on("mouseleave","li",function(){
              $(this).removeClass("active");
              
            })
          }

          function homeItem(){
            $.ajax({
              url:"data/data.json",
              success:function(result){
                var listName=result.data.homeItem.lists[0];
                console.log(listName.categorys[0].items.length);
                for(var i=0;i<listName.categorys.length;i++){  
                  $(`<li class=".nav-item2">${listName.categorys[i].listName}</li>`).appendTo("#homeItem .categorys .listName");                 
                  var node =$(`
                  <section id="stores"style="display: ${i==0?"block":"none"}" >
                  <div class="leftImg">
                      <a href="">
                          <img src="${listName.categorys[i].floorKv}" alt="">
                      </a>
                  </div>
                  </section>`);
                  var node2 =$(`
                  <div class="rightImg">
                  </div>`);
                  node.appendTo("#homeItem");
                  node2.appendTo(node);
                  
                  for(j=0;j<listName.categorys[i].items.length;j++){

                   var node3=$(`
                   <a href="${listName.categorys[i].items[j].url}">
                   <img src="${listName.categorys[i].items[j].pcImgpc}" alt="">
                   <p>${listName.categorys[i].items[j].title}</p>
                   <i>${listName.categorys[i].items[j].subtitle}</i>
                   <span>${listName.categorys[i].items[j].listprice}</span>
                   </a>`);
                   node3.appendTo(node2);
                  }
                  
                
                 }
                
               
                  
                  
              }
            })
          }

          function  homeItemtab(){

            $("#homeItem .categorys .listName").on("mouseenter","li",function(){

              
              $(this).addClass("active");
            var index=$(this).index();
            console.log(index);
            console.log($("#stores").le);
            // $("#stores").eq(index).css("display","block").nextAll().css("display","none");
              
            $("#homeItem").find("section").eq(index).css("display","block").siblings("section").css("display","none");

            })
            $("#homeItem .categorys .listName").on("mouseleave","li",function(){
              $(this).removeClass("active");
              
            })
          }
     return {
         addbanner:banner,
         adddownload:download,
         topDownLoad:topDownLoad,
         topNavTab:topNavTab,
         topDownLoadShopping:topDownLoadShopping,
         topDownLoadShoppingtab:topDownLoadShoppingtab,
         wearableItem:wearableItem,
         wearableItemtab:wearableItemtab,
         ctvItem:ctvItem,
         ctvItemtab:ctvItemtab,
         computerItem:computerItem,
         computerItemtab:computerItemtab,
         accessoryItem:accessoryItem,
         accessoryItemtab:accessoryItemtab,
         homeItem:homeItem,
         homeItemtab:homeItemtab,
     }


})