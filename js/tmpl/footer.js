$(function (){
    var memberHtml = '<a class="btn mr5" href="'+WapSiteUrl+'/tmpl/member/member.html?act=member">个人中心</a>';
    var act = GetQueryString("act");
    if(act && act == "member"){
        memberHtml = '<a class="btn mr5" id="logoutbtn" href="javascript:void(0);">注销账号</a>';
    }
    var tmpl = '<div class="footer">'
        +'<div class="footer-top">'
            +'<div class="footer-tleft">'+ memberHtml +'</div>'
            +'<a href="javascript:void(0);"class="gotop">'
                +'<span class="gotop-icon"></span>'
                +'<p>回顶部</p>'
            +'</a>'
        +'</div>'
    +'</div>';
	   var tmpl3 ='<ul class="clearfix">'
            +'<li class="footer-li1 "><a href="/wap"><dl><dt><i class="iconfont iion">&#xe67a;</i></dt><dd>首页</dd></dl></a></li>'  
            +'<li class="footer-li1"><a href="../../shopindex.html"><dl><dt><i class="iconfont icon-gouwuche1"></i></dt><dd>商城</dd></dl></a></li>'
            +'<li class="footer-li1"><a href="../cart_list.html"><dl><dt><i class="iconfont icon-dizhiguanli2"></i></dt><dd>附近</dd></dl></a></li>'
            +'<li class="footer-li1"><a href="member.html?act=member"><dl><dt><i class="iconfont iion">&#xe6a8;</i></dt><dd>个人中心</dd></dl></a></li>'
            +'</ul>';
	var tmpl2 ='<ul class="clearfix">'
        +'<li class="footer-li1"><a href="/wap"><dl><dt><i class="iconfont iion">&#xe67a;</i></dt><dd>首页</dd></dl></a></li>'  
        +'<li class="footer-li1"><a href="tmpl/product_first_categroy.html"><dl><dt><i class="iconfont iion">&#xe6d1;</i></dt><dd>分类</dd></dl></a></li>'
		+'<li class="footer-li1"><a href="tmpl/cart_list.html"><dl><dt><i class="iconfont iion">&#xe726;</i></dt><dd>购物车</dd></dl></a></li>'
		+'<li class="footer-li1"><a href="tmpl/member/member.html?act=member"><dl><dt><i class="iconfont iion">&#xe6a8;</i></dt><dd>个人中心</dd></dl></a></li>'
		+'</ul>';
	var render = template.compile(tmpl);
	var html = render();
	if(act && act == "member"){
		$("#footer").html(tmpl3);
	}else{
        $("#footer").html(tmpl2);
	}
   

    //回到顶部
    $(".gotop").click(function (){
        $(window).scrollTop(0);
    });
    var key = getcookie('key');
	$('#logoutbtn').click(function(){
		var username = getcookie('username');
		var key = getcookie('key');
		var client = 'wap';
		$.ajax({
			type:'get',
			url:ApiUrl+'/index.php?act=logout',
			data:{username:username,key:key,client:client},
			success:function(result){
				if(result){
					delCookie('username');
					delCookie('key');
					location.href = WapSiteUrl+'/tmpl/member/login.html';
                    localStorage.setItem("name","");
				}
			}
		});
	});
});

//bottom nav 33 hao-v3 by 33h ao.com Qq 1244 986 40
$(function() {
	setTimeout(function(){
		if($("#content .container").height()<$(window).height())
		{
			$("#content .container").css("min-height",$(window).height());
		}
	},300);
	$("#bottom .nav .get_down").click(function(){
		$("#bottom .nav").animate({"bottom":"-50px"});
		$("#nav-tab").animate({"bottom":"0px"});
	});
	$("#nav-tab-btn").click(function(){
		$("#bottom .nav").animate({"bottom":"0px"});
		$("#nav-tab").animate({"bottom":"-40px"});
		
	});
	setTimeout(function(){$("#bottom .nav .get_down").click();},500);
	$("#scrollUp").click(function(t) {
		$("html, body").scrollTop(300);
		$("html, body").animate( {
			scrollTop : 0
		}, 300);
		t.preventDefault()
	});
});