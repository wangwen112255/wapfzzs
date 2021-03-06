/*
* @Author: ZMZHSQ11
* @Date:   2018-01-15 12:24:34
* @Last Modified by:   ZMZHSQ11
* @Last Modified time: 2018-01-15 15:18:03
*/
$(function() {
    var key = getcookie('key');
    // console.log(key);
    if (key == '') {
        window.location.href = WapSiteUrl+'/tmpl/member/login.html';
        return;
    }
   
    var page = pagesize;
    var curpage = 1;
    var hasMore = true;
    function initPage(page,curpage) {
        $.ajax({
            type:'post',
            url:ApiUrl+"/index.php?act=member_recommend&op=recommend_list&page="+page+"&curpage="+curpage,
            data:{key:key},
            dataType:'json',
            success:function(result){

                checklogin(result.login); //检测是否登录了
                var data = result.datas;
                data.hasmore = result.hasmore; //是不是可以用下一页的功能，传到页面里去判断下一页是否可以用
                data.WapSiteUrl = WapSiteUrl; //页面地址
                data.curpage = curpage; //当前页，判断是否上一页的disabled是否显示
                data.ApiUrl = ApiUrl;
                data.key = getcookie('key');

                template.helper('tsToDateString', function (t) {
                    var d = new Date(parseInt(t) * 1000);
                    var s = '';
                    s += d.getFullYear() + '年';
                    s += (d.getMonth() + 1) + '月';
                    s += d.getDate() + '日';
                    return s;
                });

                var html = template.render('log-list-tmpl', data);
                $("#log-list").html(html);
                $("#this_recharge span").html(data.y_charge);
                //下一页
                $(".next-page").click(nextPage);

                //上一页
                $(".pre-page").click(prePage);

                $(window).scrollTop(0);
            }
        });
    }

    // 初始化页面
    initPage(page, curpage);

    // 下一页
    function nextPage() {
        var hasMore = $(this).attr("has_more");
        if (hasMore == "true") {
            curpage++;
            initPage(page, curpage);
        }
    }

    // 上一页
    function prePage() {
        if (curpage > 1) {
            $(this).removeClass("disabled");
            curpage--;
            initPage(page, curpage);
        }
    }

});
