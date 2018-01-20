$(function(){
	var key = getcookie('key');
		if(key==''){
			location.href = 'login.html';
		}
	
	
	$.sValid.init({//注册验证
        rules:{
        	mobile_code:"required",
            paypwd:"required"
        },
        messages:{
            mobile_code:"短信验证码必填！",
            paypwd:"支付密码必填!"
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
		var paypwd = $("input[name=paypwd]").val();
		var mobile_code = $("input[name=mobile_code]").val();
		
		if($.sValid()){
			$.ajax({
				type:'post',
				url:ApiUrl+"/index.php?act=member_index&op=pay_pwd",	
				data:{key:key,paypwd:paypwd,mobile_code:mobile_code},
				dataType:'json',
				success:function(result){
					if(!result.datas.error){
						alert("设置成功");
						location.href = WapSiteUrl+'/tmpl/member/member.html?act=member';
						$(".error-tips").hide();
					}else{
						$(".error-tips").html(result.datas.error).show();
					}
				}
			});			
		}
	});
	
	
	$('#send_code').on('click',function(){
		$.post(ApiUrl+"/index.php?act=member_index&op=send_reg",{key:key},function(data){
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