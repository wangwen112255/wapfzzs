$(function(){
		var key = getcookie('key');
		if(key==''){
			location.href = 'login.html';
		}
		$.ajax({
			type:'post',
			url:ApiUrl+"/index.php?act=member_index",	
			data:{key:key},
			dataType:'json',
			//jsonp:'callback',
			success:function(result){
				checklogin(result.login);
				$('#username').html(result.datas.member_info.user_name);
				$('#point').html(result.datas.member_info.point);
				$('#predepoit').html(result.datas.member_info.predepoit);
				$('#recharge').html(result.datas.member_info.recharge);
				$('#inviter').html(result.datas.member_info.inviter);
				$('#avatar').attr("src",result.datas.member_info.avator);
				switch(parseInt(result.datas.member_info.rank)){
					case 0:
				    $('#rank').html("免费会员,抓紧升级吧");
				    break;
				    	case 1:
				        $('#rank').html("债事顾问");
				        break;
				        	case 2:
				            $('#rank').html("债事代表");
				            break;
				            	case 3:
				                $('#rank').html("债事经理");
				                break;

				}
				localStorage.setItem('name', result.datas.member_info.user_name);
				localStorage.setItem('pic', result.datas.member_info.avator);

				return false;
			}
		});
});	