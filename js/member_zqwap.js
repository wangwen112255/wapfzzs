/*
* @Author: ZMZHSQ11
* @Date:   2018-01-23 17:17:41
* @Last Modified by:   ZMZHSQ11
* @Last Modified time: 2018-01-25 17:36:13
*/

$.fn.serializeObject = function() {  
    var o = {};  
    var a = this.serializeArray();  
    $.each(a, function() {  
        if (o[this.name]) {  
            if (!o[this.name].push) {  
                o[this.name] = [ o[this.name] ];  
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
    // if(key==''){
    //     window.location.href = WapSiteUrl+'/tmpl/member/login.html';
    // }
    $('.nexttwo').click(function(){
        
        hui.formInit();
        var res = huiFormCheck('#signupFormtwo');
        var zqtwo=$("#signupFormtwo").serializeObject();
        var zq=JSON.parse(localStorage.getItem('zq'));
        var zqone=JSON.parse(localStorage.getItem('zqone'));
        // var zqtwo=JSON.parse(localStorage.getItem('zqtwo'));
        console.log(zq)
        console.log(zqone)
    
        switch(zq.iscover){
            case 'on':
            zq.iscover=0;
            break;
            default:
            zw.iscover=1;
            break;
        }

        switch(zq.islaw){
            case 'on':
            zq.islaw=0;
            break;
            default:
            zq.islaw=1;
            break;
        }
        switch(zqone.zw_marriage){
            case '未婚':
            zqone.zw_marriage=0;
            break;
            case '已婚':
            zqone.zw_marriage=1;
            break;
        }
        switch(zqone.zw_job){
            case '教师':
            zqone.zw_job=0;
            break;
            case '建筑工程师':
            zqone.zw_job=1;
            break;
            case '公务员':
            zqone.zw_job=2;
            break;
            case '财务会计':
            zqone.zw_job=3;
            break;
            case '销售顾问':
            zqone.zw_job=4;
            break;
            case '行政人事':
            zqone.zw_job=5;
            break;
            case '金融期货':
            zqone.zw_job=6;
            break;
        }
        switch(zqone.zw_education){
            case '硕士及以上':
            zqone.zw_education=0;
            break;
            case '本科':
            zqone.zw_education=1;
            break;
            case '专科':
            zqone.zw_education=2;
            break;
            case '高中及以下':
            zqone.zw_education=3;
            break;
        }

        switch(zqone.zw_house){
            case '有房子 ':
            zqone.zw_house=0;
            break;
            case '无房子':
            zqone.zw_house=1;
            break;
            case '不清楚':
            zqone.zw_house=2;
            break;
        }
        switch(zqone.isdanbao){
            case 'on':
            zqone.isdanbao=0;
            break;
            default :
            zqone.isdanbao=1;
            break;
        }
        switch(zqone.zw_health){
            case '优秀':
            zqone.zw_health=0;
            break;
            case '良好':
            zqone.zw_health=1;
            break;
            case '差劲':
            zqone.zw_health=2;
            break;
            default:
            zqone.zw_health=3;

        }
        if(zqone.danbaotype){
            switch(zqone.danbaotype){
                case '个人担保':
                zqone.danbaotype=0;
                break;
                case '企业担保':
                zqone.danbaotype=1;
                break;
            }

        }
        var result=$.extend({},zq,zqone);
        console.log(result)
        var zqdata=$.extend({},zqtwo,result);
        // console.log(result)

        console.log(zqdata);
      
        // var name = $("input[name=name]").val();
        // var numcard = $("input[name=numcard]").val();
        // var zw_name = $("input[name=zw_name]").val();
        // var zw_numcard = $("input[name=zw_numcard]").val();
        // var zw_image_1 = $("input[name=zw_image_1]").val();
        // var zw_image_2 = $("input[name=zw_image_2]").val();
        // var zw_image_3 = $("input[name=zw_image_3]").val();
        // var zw_image_4 = $("input[name=zw_image_4]").val();
        // var zw_image_5 = $("input[name=zw_image_5]").val();
        // var card_img_1 = $("input[name=card_img_1]").val();
        // var card_img_2 = $("input[name=card_img_2]").val();
        // var mobile = $("input[name=mobile]").val();
        // var zw_mobile = $("input[name=zw_mobile]").val();
        // var tj_name = $("input[name=tj_name]").val();
        // var province =$("#province").val();
        // var city =$("#city").val();
        // var amount = $("input[name=amount]").val();
   
        // console.log(typeof($("#validation").serializeArray()))
        var  infostring=JSON.stringify($("#validation").serializeObject());
        localStorage.setItem('info',infostring);
        // console.log(localStorage.getItem('info'));
        var options = {
                url: ApiUrl+"/index.php?act=member_index&op=member_zq&key="+key,
                type: 'post',
                dataType: 'json',
                data: zqdata,
                beforeSend:function(XMLHttpRequest){ 
                     // layer.load(0, {shade: false});
                     $.showPreloader("资料正在提交请耐心等待");
                     // hui.loading("资料正在提交请耐心等待")

                }, 
                success: function (result) {
                    if(result.datas.error){
                    hui.closeLoading();
                     $.hidePreloader();
                     $.toast(result.datas.error);
                    
                    }else{
                     $.hidePreloader();
                     $.toast("恭喜您资料上传成功");
                     setTimeout(function(){
                     window.location.href = WapSiteUrl+'/tmpl/member/member_zqpr.html';
                     },3000)
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
                // var cue = result.datas.cues;
                $.confirm('您确定要提交?', 
                     function () {
                        $.ajax(options);
                     },
                     function () {
                       
                     }
                   );
            
            }
        });
        
            
            return false;
    });

 
    
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



