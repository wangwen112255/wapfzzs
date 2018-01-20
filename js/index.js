$(function() {

    $.ajax({
        url: ApiUrl + "/index.php?act=index",
        type: 'get',
        dataType: 'json',
        success: function(result) {
            var data = result.datas;
            var html = '';

            $.each(data, function(k, v) {
                $.each(v, function(kk, vv) {
                    switch (kk) {
                        case 'adv_list':
                        case 'home3':
                            $.each(vv.item, function(k3, v3) {
                                vv.item[k3].url = buildUrl(v3.type, v3.data);
                            });
                            break;

                        case 'home1':
                            vv.url = buildUrl(vv.type, vv.data);
                            break;

                        case 'home2':
                        case 'home4':
                            vv.square_url = buildUrl(vv.square_type, vv.square_data);
                            vv.rectangle1_url = buildUrl(vv.rectangle1_type, vv.rectangle1_data);
                            vv.rectangle2_url = buildUrl(vv.rectangle2_type, vv.rectangle2_data);
                            break;
                    }
					
					if(k == 1){
						
						html +='<div class="nav">'
							 +'<ul class="clearfix">'
							 +'<li><a href="tmpl/product_first_categroy.html"><div class="main-img"><img src="images/icon-fenlei.png"></div><p>分类</p></a></li>'
							 +'<li><a href="tmpl/member/member_zq.html"><div class="main-img"><img src="images/icon-zixun.png"></div><p>债事备案</p></a></li>'
							 +'<li><a href="tmpl/product_list.html?gc_id=1135"><div class="main-img"><img src="images/icon-jinka.png"></div><p>金卡专区</p></a></li>'
							+'<li><a href="tmpl/credit_list.html"><div class="main-img"><img src="images/icon-zixin.png"></div><p>资信查询</p></a></li>'
							+'<li><a href="tmpl/member/member.html?act=member"><div class="main-img"><img src="images/icon-gerenzhongxin.png"></div><p>个人中心</p></a></li>'
							+'<li><a href="tmpl/product_list.html?gc_id=1058"><div class="main-img"><img src="images/icon-fangchan.png"></div><p>房产</p></a></li>'
							+'<li><a href="tmpl/product_list.html?gc_id=1068"><div class="main-img"><img src="images/icon-qiche.png"></div><p>汽车</p></a></li>'
							+'<li><a href="tmpl/product_list.html?gc_id=3"><div class="main-img"><img src="images/icon-jiajv.png"></div><p>家居</p></a></li>'
							+'<li><a href="tmpl/product_list.html?gc_id=308"><div class="main-img"><img src="images/icon-dianqi.png"></div><p>电器</p></a></li>'
							+'<li><a href="tmpl/product_list.html?gc_id=593"><div class="main-img"><img src="images/icon-jiu.png"></div><p>中外名酒</p></a></li></ul></div>';
					}
                    html += template.render(kk, vv);
                    return false;
                });
            });

            $("#main-container").html(html);

          $('.swiper-wrapper').each(function() {
              if ($(this).find('.swiper-slide').length < 2) {
                  return;
              }

              var mySwiper = new Swiper ('.swiper-container', {
				pagination: '.swiper-pagination',
				autoplay: 3000,
				loop: true
			  }); 
          });

        }
    });

    $('.search-index').click(function(){
        var keyword = encodeURIComponent($('#keyword').val());
        window.location.href = WapSiteUrl+'/tmpl/product_list.html?keyword='+keyword;
    });

});
function bodyScale(){
	var devicewidth=document.documentElement.clientWidth;
	var scale=devicewidth/480;
	document.body.style.zoom=scale;
}
window.onload=window.onresize=function(){
//	bodyScale();
	var mySwiper = new Swiper ('.swiper-container', {
    pagination: '.swiper-pagination',
    autoplay: 3000,
    loop: true
  });  
  $('.footer-end ul .footer-li1').click(function(){
  	$(this).addClass("on").siblings().removeClass("on");
  })      
	
}
var userScalable = "no";
var ins = "";
(function() {
	if (window.devicePixelRatio === 1.5) {
		userScalable = "yes";
		ins = "initial-scale=0.5"
	}
	var text = "<meta content='"+ins+", target-densitydpi=device-dpi, width=640,user-scalable=" + userScalable + "' name='viewport'>";
	document.write(text);
})();