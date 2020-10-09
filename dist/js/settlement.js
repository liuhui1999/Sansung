define(["jquery","jquery-cookie"],function($){


    function shopListDown(){
        $.ajax({
          url:"data/settlemenList.json",
          success:function(result){
            
           
          var newArr=result[0].childs;
          for(i=0;i<newArr.length;i++){
              var node=$(` <li class="item-list">
              <img src="${newArr[i].pcImgpc}" alt="">
              <p>${newArr[i].title}</p>
              <i>${newArr[i].listprice}</i>
              <button class="add" id="${newArr[i].id}"><a>加入购物车</a></button>
          </li>`);
          node.appendTo(".ul-list");
          }
           
            
        
          }
        })
      }


      function loadCarData(){
          $.ajax({
              url:"data/settlemenList.json",
              success:function(arr){
               
                var Arr=arr[0].childs;
                console.log(Arr);
                var cookieStr=$.cookie("goods");
                if(cookieStr){
                    var cookieArr=JSON.parse(cookieStr);
                   
                    
                    var newArr=[];
                    for(var i=0;i<cookieArr.length;i++){
                        for(var j=0;j<Arr.length;j++){
                            if(cookieArr[i].id==Arr[j].id){
                                Arr[j].num=cookieArr[i].num;
                                Arr[j].id=Arr[j].id;
                                newArr.push(Arr[j]);
                            }
                        }
                    }
                    // console.log(newArr);    

                    for(i=0;i<newArr.length;i++){
                      var node=  $(`<div class="shopping" id=${newArr[i].id}>
                        <input type="checkbox" name="" class="select">
                        <img src="${newArr[i].pcImgpc}" alt="">
                        <span>${newArr[i].title}</span>
                        <span class="col-price">${newArr[i].listprice}</span>
                        <section class="number">
                            <button class="j_minus">-</button>
                            <input type="text" value="${newArr[i].num}" class="col-num"></input>
                            <button class="j_plus">+</button>
                        </section>
                        <span class="col-total">${newArr[i].listprice*newArr[i].num}</span>
                        <button class="delete">X</button>
                    </div>`);
                    node.insertBefore(".total");
                    }
                    isCheckAll();
                    
                }
              }
          })
          
      }
     function Download(){
        $("#list .ul-list").on("click", '.add', function(){
            var id = this.id; //点击按钮的这个商品的id
            //1、判定是否是第一次添加
            var first = $.cookie("goods") == null ? true : false;
            if(first){
              var arr = [{id:id,num:1}];
              $.cookie("goods", JSON.stringify(arr), {
                expires: 7
              })
            }else{
              //不是第一次，判定之前是否添加过
              var same = false; //假设之前没添加过
              var cookieArr = JSON.parse($.cookie("goods"));
              for(var i = 0; i < cookieArr.length; i++){
                if(cookieArr[i].id === id){
                  cookieArr[i].num++;
                  same = true;
                  break;
                }
              }
    
              if(!same){
                var obj = {id: id, num: 1};
                cookieArr.push(obj);
              }
    
              $.cookie("goods", JSON.stringify(cookieArr), {
                expires: 7
              })
            }
            console.log($.cookie("goods"));
            // sc_num();
            // sc_msg();
            
            isCheckAll();
            refresh();
          });
     };
     
      function checkFunc(){
        $("#selectAll").click(function(){
          // var allChecks=$("#table .shopping").find("input");

          if($("#selectAll[type='checkbox']").is(':checked')==true){
              console.log("全选");
              
            // $("#selectAll[type='checkbox']").attr("checked",false);
            $(".select[type='checkbox']").prop("checked",true).addClass("select icon-checkbox-selected");
          }else{
            console.log("全不选");
            // $("#selectAll[type='checkbox']").attr("checked",true);
            $(".select[type='checkbox']").prop("checked",false).removeClass("icon-checkbox-selected");
          }
          isCheckAll();
        })

        $("#table").on("click",".select",function(){
          // console.log(this);
          $(this).addClass("select icon-checkbox-selected");
            if($(this).is(':checked')==false){
              
              $(this).removeClass("icon-checkbox-selected");}
            
            // $(this).addClass("icon-checkbox-selected");
            isCheckAll();
        })
      }

      function isCheckAll(){
        var allChecks=$("#table").find(".shopping");
        var isAll=true;//是否都选中
        var total=0;//计算总数
        var count=0;//记录被选中的数量
        var totalCount=0;//记录总数
        
        allChecks.each(function(index,item){
            // console.log($(item).find(".clo-price"));
          if(!$(item).find(".select").hasClass("icon-checkbox-selected")){
            isAll=false;
            $("#selectAll[type='checkbox']").prop("checked",false)
            // console.log(isAll);
          
          }else{
            total+=parseFloat($(item).find(".col-price").html().trim())*parseFloat($(this).find(".col-num").val());
            
            count+=parseFloat($(this).find(".col-num").val());
            

          }
          totalCount+=parseFloat($(this).find(".col-num").val());
        })

        $(".Allprice").html(total);
        // console.log(total);
        
        if(isAll){
          $("#selectAll[type='checkbox']").prop("checked",true)
        }


      }
 
      function refresh() {
        window.location.reload();//刷新当前页面.

        //或者下方刷新方法
        //parent.location.reload()刷新父亲对象（用于框架）--需在iframe框架内使用
        //opener.location.reload()刷新父窗口对象（用于单开窗口)
        //top.location.reload()刷新最顶端对象（用于多开窗口）
    }

    //商品数量加减
    function changeCars(){
      //给每一个删除按钮添加事件
      $("#table").on("click",".shopping .delete",function(){
        var id=$(this).closest(".shopping").remove().attr("id");
        var cookieStr=$.cookie("goods");
        var cookieArr=JSON.parse(cookieStr);
        for(var i=0;i<cookieArr.length;i++){
          if(id==cookieArr[i].id){
            cookieArr.splice(i,1);
            break;
          }
        }
        cookieArr.length==0?$.cookie("goods",null):$.cookie("goods",JSON.stringify(cookieArr),{expires:7})
      
      })

      //给每一个加减添加事件
      $("#table").on("click",".j_minus,.j_plus",function(){
        var id=$(this).closest(".shopping").attr("id");
        var cookieStr=$.cookie("goods");
        var cookieArr=JSON.parse(cookieStr);
        for(var i=0;i<cookieArr.length;i++){
          if(cookieArr[i].id==id){
            if(this.className=="j_minus"){
              cookieArr[i].num==1?alert("数量为1不能在减少"):cookieArr[i].num--;
            }else{
              cookieArr[i].num++;
            }
            break;
          }
        }
        $(this).siblings("input").val(cookieArr[i].num);
        var price=parseFloat($(this).closest(".number").siblings(".col-price").html().trim());
        $(this).parent(".number").siblings(".col-total").html((price*cookieArr[i].num));
        $.cookie("goods",JSON.stringify(cookieArr),{expires:7})
        isCheckAll();
      })
     
    }
    return{
        shopListDown:shopListDown,
        Download:Download,
        loadCarData:loadCarData,
        checkFunc:checkFunc,
        changeCars:changeCars
    }
});