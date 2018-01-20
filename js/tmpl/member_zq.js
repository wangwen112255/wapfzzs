$.fn.serializeObject = function()
{
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};
$(function(){
	var key = getcookie('key');
	if(key==''){
		window.location.href = WapSiteUrl+'/tmpl/member/login.html';
	}
	
	
	$('#this_button').click(function(){
		localStorage.removeItem("info");
		var name = $("input[name=name]").val();
		var numcard = $("input[name=numcard]").val();
		var zw_name = $("input[name=zw_name]").val();
		var zw_numcard = $("input[name=zw_numcard]").val();
		var zw_image_1 = $("input[name=zw_image_1]").val();
		var zw_image_2 = $("input[name=zw_image_2]").val();
		var zw_image_3 = $("input[name=zw_image_3]").val();
		var zw_image_4 = $("input[name=zw_image_4]").val();
		var zw_image_5 = $("input[name=zw_image_5]").val();
		var card_img_1 = $("input[name=card_img_1]").val();
		var card_img_2 = $("input[name=card_img_2]").val();
		var mobile = $("input[name=mobile]").val();
		var zw_mobile = $("input[name=zw_mobile]").val();
		var tj_name = $("input[name=tj_name]").val();
		var province =$("#province").val();
		var city =$("#city").val();
		var amount = $("input[name=amount]").val();
		if(name == ''){
			// layer.open({
			// content: '债权人姓名不能为空'
			// ,skin: 'msg'
			// ,time: 2 //2秒后自动关闭
		 //  });
		 layer.msg('债权方姓名不能为空');
		  $("input[name=name]").focus();
		  return false;
		}
		
		if(!(/^1(3|4|5|7|8)\d{9}$/.test(mobile))){
			// layer.open({
			// content: '请输入正确的债权人手机号'
			// ,skin: 'msg'
			// ,time: 3 //2秒后自动关闭
		 //  });
		 layer.msg('请输入正确的债权方手机号');
		  $("input[name=mobile]").focus();
		  return false;
		}
		
		if(!/^\d{17}(\d|x)$/i.test(numcard)){
			// layer.open({
			// content: '请正确填写债权人身份证号码'
			// ,skin: 'msg'
			// ,time: 2 //2秒后自动关闭
		 //  });
		 layer.msg('请正确填写债权人身份证号码');
		  $("input[name=numcard]").focus();
		  return false;
		}
//		if(zw_numcard!=''){
//			if(!/^\d{17}(\d|x)$/i.test(zw_numcard)){
//				layer.open({
//				content: '请正确填写债务人身份证号码'
//				,skin: 'msg'
//				,time: 2 //2秒后自动关闭
//			});
//				$("input[name=zw_numcard]").focus();
//				return false;
//			}
//		}
		
		
		if(zw_name == ''){
			// layer.open({
			// content: '债务人姓名不能为空'
			// ,skin: 'msg'
			// ,time: 2 //2秒后自动关闭
		 //  });
		 layer.msg('债务人姓名不能为空');
		  $("input[name=zw_name]").focus();
		  return false;
		}
		
		if(!(/^1(3|4|5|7|8)\d{9}$/.test(zw_mobile))){
			// layer.open({
			// content: '请输入正确的债务人手机号'
			// ,skin: 'msg'
			// ,time: 2 //2秒后自动关闭
		 //  });
		 layer.msg('请输入正确的债务人手机号');

		  $("input[name=zw_mobile]").focus();
		  return false;
		}
		
		if(!(zw_image_1 != '' || zw_image_2 != '' || zw_image_3 != '' || zw_image_4 != '' || zw_image_5 != '')){
			// layer.open({
			// content: '至少上传一张借款合同扫描件'
			// ,skin: 'msg'
			// ,time: 2 //2秒后自动关闭
		 //  });
		 layer.msg('至少上传一张借款合同扫描件');
		  return false;
		}
		if(card_img_1 == ''){
			// layer.open({
			// content: '上传身份证扫描件正面'
			// ,skin: 'msg'
			// ,time: 2 //2秒后自动关闭
		 //  });
		 layer.msg('上传身份证扫描件正面');
		  return false;
		}
		if(card_img_2 == ''){
			// layer.open({
			// content: '上传身份证扫描件反面'
			// ,skin: 'msg'
			// ,time: 2 //2秒后自动关闭
		 //  });
		 layer.msg('上传身份证扫描件反面');

		  return false;
		}
		
		if(amount == ''){
			// layer.open({
			// content: '债务金额不能为空'
			// ,skin: 'msg'
			// ,time: 2 //2秒后自动关闭
		 //  });
		 layer.msg('债务金额不能为空');
		  $("input[name=amount]").focus();
		  return false;
		}
		// console.log(typeof($("#validation").serializeArray()))
		var  infostring=JSON.stringify($("#validation").serializeObject());
		localStorage.setItem('info',infostring);
		// console.log(localStorage.getItem('info'));
		var options = {
                url: ApiUrl+"/index.php?act=member_index&op=member_zq&key="+key,
                type: 'post',
                dataType: 'json',
                data: $("#validation").serialize(),
				beforeSend:function(XMLHttpRequest){ 
      //         		layer.open({
						// type: 2
						// ,content: '提交中'
					 //  });
					 // layer.msg('正在提交')
					 layer.load(0, {shade: false});
         		}, 
                success: function (result) {
                	if(result.datas.error){
                		
						layer.open({
							content: result.datas.error
							,btn: '确定'
							,yes: function(index){
							  layer.closeAll();
							}

						});
						layer.close(i);
					}else{
						layer.open({
							content: "添加成功，点击确定进行打印预览"
							,btn: '确定'
							,yes: function(index){
								
								window.location.href = WapSiteUrl+'/tmpl/member/member_zqpr.html';
								layer.close(index);
							}
						});
					}
                },
				error:function(){ 
					layer.closeAll();
				} 
            };
		$.ajax({
			url: ApiUrl+"/index.php?act=member_index&op=cue&key="+key,
			type: 'get',
			dataType: 'json',    
			success: function(result) {
				var cue = result.datas.cues;
				layer.open({
					content: cue
					,btn: ['确认', '取消']
					,yes: function(index){
						$.ajax(options);
						layer.close(index);
					}
				});
			}
		});
		
            
            return false;
	});
	function bodyScale(){
	var devicewidth=document.documentElement.clientWidth;
	var scale=devicewidth/640;
	document.body.style.zoom=scale;
}
window.onload=window.onresize=function(){
//	bodyScale();
}
	$("#file1 input").change(function(){	 
	 	var file = this.files[0]; 
	    //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件   
	    if(!/image\/\w+/.test(file.type)){
	        alert("请确保文件为图像类型"); 
	        return false; 
	    }
	    var reader = new FileReader(); 
	    reader.readAsDataURL(file); 
	    console.log();
	    reader.onload = function(e){
	    		
	    	var imgs1="<img src='"+this.result+"' width='106' height='106' />";
	  	  	$(".ff1").html(imgs1);
	  	  	$(".zw_img_1").val(this.result);
	    }
	}) 
	
	$("#file4 input").change(function(){	 
	 	var file = this.files[0]; 
	    //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件   
	    if(!/image\/\w+/.test(file.type)){
	        alert("请确保文件为图像类型"); 
	        return false; 
	    }
	    var reader = new FileReader(); 
	    reader.readAsDataURL(file); 
	    console.log();
	    reader.onload = function(e){
	    		
	    	var imgs1="<img src='"+this.result+"' width='106' height='106' />";
	  	  	$(".ff4").html(imgs1);
	  	  	$(".zw_img_2").val(this.result);
	    }
	}) 
	
	$("#file5 input").change(function(){	 
	 	var file = this.files[0]; 
	    //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件   
	    if(!/image\/\w+/.test(file.type)){
	        alert("请确保文件为图像类型"); 
	        return false; 
	    }
	    var reader = new FileReader(); 
	    reader.readAsDataURL(file); 
	    console.log();
	    reader.onload = function(e){
	    		
	    	var imgs1="<img src='"+this.result+"' width='106' height='106' />";
	  	  	$(".ff5").html(imgs1);
	  	  	$(".zw_img_3").val(this.result);
	    }
	}) 
	
	$("#file6 input").change(function(){	 
	 	var file = this.files[0]; 
	    //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件   
	    if(!/image\/\w+/.test(file.type)){
	        alert("请确保文件为图像类型"); 
	        return false; 
	    }
	    var reader = new FileReader(); 
	    reader.readAsDataURL(file); 
	    console.log();
	    reader.onload = function(e){
	    		
	    	var imgs1="<img src='"+this.result+"' width='106' height='106' />";
	  	  	$(".ff6").html(imgs1);
	  	  	$(".zw_img_4").val(this.result);
	    }
	}) 
	
	$("#file7 input").change(function(){	 
	 	var file = this.files[0]; 
	    //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件   
	    if(!/image\/\w+/.test(file.type)){
	        alert("请确保文件为图像类型"); 
	        return false; 
	    }
	    var reader = new FileReader(); 
	    reader.readAsDataURL(file); 
	    console.log();
	    reader.onload = function(e){
	    		
	    	var imgs1="<img src='"+this.result+"' width='106' height='106' />";
	  	  	$(".ff7").html(imgs1);
	  	  	$(".zw_img_5").val(this.result);
	    }
	}) 
	
	$("#file2 input").change(function(){
		var file = this.files[0]; 
	    //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件   
	    if(!/image\/\w+/.test(file.type)){
	        alert("请确保文件为图像类型"); 
	        return false; 
	    }
	    var reader = new FileReader(); 
	    reader.readAsDataURL(file); 
	    console.log();
	    reader.onload = function(e){
	    		
	    	var imgs2="<img src='"+this.result+"' width='106' height='106' />";
	  	  	$(".ff2").html(imgs2);
	  	  	$(".card_img1").val(this.result);
	    }
	}) ;
	$("#file3 input").change(function(){
		var file = this.files[0]; 
	    //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件   
	    if(!/image\/\w+/.test(file.type)){
	        alert("请确保文件为图像类型"); 
	        return false; 
	    }
	    var reader = new FileReader(); 
	    reader.readAsDataURL(file); 
	    console.log();
	    reader.onload = function(e){
	    		
	    	var imgs3="<img src='"+this.result+"' width='106' height='106' />";
	  	  	$(".ff3").html(imgs3);
	  	  	$(".card_img2").val(this.result);
	    }
	}) ;
	$("#file8 input").change(function(){
		var file = this.files[0]; 
	    //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件   
	    if(!/image\/\w+/.test(file.type)){
	        alert("请确保文件为图像类型"); 
	        return false; 
	    }
	    var reader = new FileReader(); 
	    reader.readAsDataURL(file); 
	    console.log();
	    reader.onload = function(e){
	    		
	    	var imgs3="<img src='"+this.result+"' width='106' height='106' />";
	  	  	$(".ff8").html(imgs3);
	  	  	$(".card_img3").val(this.result);
	    }
	}) ;
	$("#file9 input").change(function(){
		var file = this.files[0]; 
	    //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件   
	    if(!/image\/\w+/.test(file.type)){
	        alert("请确保文件为图像类型"); 
	        return false; 
	    }
	    var reader = new FileReader(); 
	    reader.readAsDataURL(file); 
	    console.log();
	    reader.onload = function(e){
	    		
	    	var imgs3="<img src='"+this.result+"' width='106' height='106' />";
	  	  	$(".ff9").html(imgs3);
	  	  	$(".card_img4").val(this.result);
	    }
	}) ;
	
});
//建立一個可存取到該file的url
function getObjectURL(file) {
 var url = null ; 
 if (window.createObjectURL!=undefined) { // basic
  url = window.createObjectURL(file) ;
 } else if (window.URL!=undefined) { // mozilla(firefox)
  url = window.URL.createObjectURL(file) ;
 } else if (window.webkitURL!=undefined) { // webkit or chrome
  url = window.webkitURL.createObjectURL(file) ;
 }
 return url ;
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
