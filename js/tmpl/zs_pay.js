$(function() {
	var id = GetQueryString("id");
	var key = getcookie('key');
	var data   = {key:key , id:id};
	$.ajax({//提交订单信息
			type:'post',
			url:ApiUrl+'/index.php?act=member_index&op=zs_record',
			dataType:'json',
			data:data,
			success:function(result){
				var info = result.datas.zs_info;
			$('#pay_id').html(info.pay_id);
			$('#zq_name').html(info.name);
			$('#zq_phone').html(info.mobile);
			$('#zq_card').html(info.numcard);
			$('#zw_name').html(info.zw_name);
			$('#zw_phone').html(info.zw_mobile);
			$('#total').html(info.total);
			$('#total_price').html(info.audit_money);
			if(info.status== 1){
				$('#status').html('未审核');
			}
			if(info.status!=2){
				$('.zhifu').css('display','none');
			}
			return false;
		}
	});
	$('.ali').click(function(){
		$('.ali').attr('src','../images/queding.png');
		$('#alipay').attr('class','payment zhong');
		$('#wxpay').attr('class','payment');
		$('.weixin').attr('src','../images/no.png');
	});
	$('.weixin').click(function(){
		$('.weixin').attr('src','../images/queding.png');
		$('#alipay').attr('class','payment');
		$('#wxpay').attr('class','payment zhong');
		$('.ali').attr('src','../images/no.png');
	});
	$('#buy_step2').click(function(){
		var payment_code = $('.zhong').val();
		window.location.href = ApiUrl+'/index.php?act=member_payment&op=zs_pay&key='+ key +'&pay_id='+ $('#pay_id').text() +'&payment_code='+payment_code;
	});
});
