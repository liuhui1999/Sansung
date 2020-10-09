define(["jquery"],function($){
function navdata(){
        
        $("#div4 .banner article .shop-list1").on("click","li",function(){
        $(this).addClass("active").siblings().removeClass("active")
       
     
       var oUl = $("#div4").find(" .banner section #shop-list2");
      
     
       var iNow=$(this).index();
      
       $("#myimg").attr('src',`images/mo${iNow+1}.jpg`);
     
        oUl.animate({ left: -610 * iNow }, 1000, function () {
        });
      

        });

            
        }

        $("#sec1").mouseenter(function(){
            
            $("#big").show();
          }).mouseleave(function(){
            $("#big").hide();
          }).mousemove(function(ev){
              var l = ev.clientX - $(this).offset().left - 100;
              l = Math.max(l, 0);
              l = Math.min(400, l);
              var t = ev.clientY - $(this).offset().top - 50;
              t = Math.max(t, 0);
              t = Math.min(800, t);
           
            //放大的图片，反方向对应倍数移动
            $("#big img").css({
              left: -2 * l,
              top: -2 * t
            })
          })


      
    

return {
    navdata:navdata,
   

    
}








})