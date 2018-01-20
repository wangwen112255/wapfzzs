$(function(){
	
	
	$.sValid.init({//注册验证
        rules:{
        	username:"required",
            userpwd:"required",            
            password_confirm:"required",
            mobile_code:"required"
        },
        messages:{
            username:"用户名必须填写！",
            userpwd:"密码必填!", 
            password_confirm:"确认密码必填!",
            mobile_code:"验证码必填"
        },
        callback:function (eId,eMsg,eRules){
            if(eId.length >0){
                var errorHtml = "";
                $.map(eMsg,function (idx,item){
                    errorHtml += "<p>"+idx+"</p>";
                });
                $(".error-tips").html(errorHtml).show();
            }else{
                $(".error-tips").html("").hide();
            }
        }  
    });
	
	$('#loginbtn').click(function(){	
		var username = $("input[name=username]").val();
		var pwd = $("input[name=pwd]").val();
		var password_confirm = $("input[name=password_confirm]").val();
		//var email = $("input[name=email]").val();
		var mobile_code = $("input[name=mobile_code]").val();
		var client = $("input[name=client]").val();
		
		if($.sValid()){
			$.ajax({
				type:'post',
				url:ApiUrl+"/index.php?act=login&op=forget_password",
				data:{username:username,password:pwd,password_confirm:password_confirm,mobile_code:mobile_code,client:client},
				dataType:'json',
				success:function(result){
					if(!result.datas.error){
						if(typeof(result.datas.key)=='undefined'){
							return false;
						}else{
							addcookie('username',result.datas.username);
							addcookie('key',result.datas.key);
							location.href = WapSiteUrl+'/tmpl/member/member.html?act=member';
						}
						$(".error-tips").hide();
					}else{
						$(".error-tips").html(result.datas.error).show();
					}
				}
			});			
		}
	});
	
	
	$('#send_code').on('click',function(){
		if ($('#username').val() == ''){
			alert('手机号不能为空');
			return false;
		}
		$.post(ApiUrl+"/index.php?act=login&op=send_reg",{mobile:$('#username').val(),type:'forget'},function(data){
			console.log(data);
			if (data.datas.error) {
				alert(data.datas.error);
			}
			if(data.datas.status == 1)
			{
				alert('发送成功');
			}
		},"json");
	});
	
	
});