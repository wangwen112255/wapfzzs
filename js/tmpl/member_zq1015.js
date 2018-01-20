$(function(){
	var key = getcookie('key');
	if(key==''){
		window.location.href = WapSiteUrl+'/tmpl/member/login.html';
	}
	
	$('#this_button').click(function(){
		var name = $("input[name=name]").val();
		var numcard = $("input[name=numcard]").val();
		var zw_name = $("input[name=zw_name]").val();
		var zw_image = $("input[name=zw_image]").val();
		var card_img_1 = $("input[name=card_img_1]").val();
		var card_img_2 = $("input[name=card_img_2]").val();
		var amount = $("input[name=amount]").val();
		var mobile = $("input[name=mobile]").val();
		
		var options = {
                url: ApiUrl+"/index.php?act=member_index&op=member_zq&key="+key,
                type: 'post',
                dataType: 'json',
                data: $("#form1").serialize(),
                success: function (result) {
                	if(result.datas.error){
                		
                		$.sDialog({
                            skin:"red",
                            content:result.datas.error,
                            okBtn:false,
                            cancelBtn:false
                        });
					}else{
						$.sDialog({
                            skin:"red",
                            content:"添加成功",
                            okBtn:function(){
                            	window.location.href = WapSiteUrl+'/tmpl/member/member.html';
                            },
                            cancelBtn:false
                        });
					}
                }
            };
            $.ajax(options);
            return false;
	});
	function bodyScale(){
	var devicewidth=document.documentElement.clientWidth;
	var scale=devicewidth/640;
	document.body.style.zoom=scale;
}
window.onload=window.onresize=function(){
	bodyScale();
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
	  	  	$(".zw_img").val(this.result);
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


