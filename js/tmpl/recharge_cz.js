$(function(){
	var key = getcookie('key');
	if(key==''){
		window.location.href = WapSiteUrl+'/tmpl/member/login.html';
	}
	
	$.ajax({
			type:'post',
			url:ApiUrl+"/index.php?act=member_index",	
			data:{key:key},
			dataType:'json',
			//jsonp:'callback',
			success:function(result){
				checklogin(result.login);
				$('#this_recharge span').html(result.datas.member_info.recharge);
				return false;
			}
		});
	
	
	$('.this_button').click(function(){
		var recharge_num = $("input[name=recharge_num]").val();
		
		if(recharge_num == '')
		{
			layer.open({
			content: '请输入债权金号'
			,skin: 'msg'
			,time: 2 //2秒后自动关闭
		  });
			return false;
		}
		var options = {
                url: ApiUrl+"/index.php?act=member_index&op=member_cz&key="+key,
                type: 'post',
                dataType: 'json',
                data: {recharge_num:recharge_num},
                success: function (result) {
                	if(result.datas.error){
                		
						layer.open({
						content: result.datas.error
						,skin: 'msg'
						,time: 2 //2秒后自动关闭
					  });
					}else{
						
						layer.open({
							content: result.datas.error
							,btn: '确定'
							,yes: function(index){
							  location.href = WapSiteUrl+'/tmpl/member/member.html?act=member';
							}

						});
					}
                }
            };
            $.ajax(options);
            return false;
	});

});


