$(function(){
    // var domin = "http://localhost:8081/jinbang";
    var domin = "http://11pm.top:8081/jinbang";

    layui.use(['element', 'layer'], function() {
    let element = layui.element,
        layer = layui.layer,
        $ = layui.jquery;
    
    $(document).ready(function() {
        let name = window.localStorage.getItem("name");
        $("#name").text(name);
        // $(window).resize(function() {
        //     FrameWH();
        // });
    });

    // // 注销
    $("#logout").click(function(event) {
        event.preventDefault();
        //jQuery.support.cors = true;
        // console.log("jfdaifjaiooi")
        $.ajax({
            url: domin + "/logout",
            type: "post",
            xhrFields: {
                withCredentials: true
            },
            data: JSON.stringify({data: {session: window.localStorage.getItem("session")}}),
            dataType: 'json',
			contentType: "application/json",
            
            success: function(da) {
                if(da.state == "success") {
                    window.localStorage.clear();
                    window.location.href = "index.html";
                } else {
                    console.log(da.msg);
                    window.location.reload();
                }
            },
            error: (da)=>{
                console.log(da);
            }
        });
    })
    
    //顶部右侧菜单监控
    element.on('nav(rightmenu)', function(elem) {
        var url = $(this).attr("lay-href");
        if (url != undefined) {
            layer.open({
                title: elem[0].innerText,
                type: 2,
                content: url,
                area: ['600px', '500px']
            });
        }
        if (elem[0].innerText == "锁屏") {
            layer.open({
                title: "已锁屏",
                content: '<input name="pass" class="layui-input" type="text" placeholder="请输入密码解锁" autocomplete="off"/>',
                btnAlign: 'c',
                anim: 1,
                btn: ['解锁'],
                yes: function(index, layero) {
                    var pass = layero.find('.layui-layer-content input').val();
                    if (pass == "123456") {
                        layer.close(index);
                    } else {
                        layer.title("密码不正确！", index);
                    }
                },
                cancel: function() {
                    return false //开启该代码可禁止点击该按钮关闭
                }
            });
        }
    })
    //左侧垂直菜单监控
    element.on('nav(navtree)', function(elem) {
        if ($(".layui-side-menu").width() < 200) {
            $(".layui-side-menu").animate({
                width: $(".layui-side-menu").width() + 144 + "px"
            });
            $(".layui-body").animate({
                left: $(".layui-body").position().left + 144 + "px"
            });
            $(".layui-footer").animate({
                left: $(".layui-footer").position().left + 144 + "px"
            });
            $(".layui-layout-left li:first-child").find("a").attr("class", "hidetab");
            $(".layui-layout-left li:first-child").find("i").attr("class", "layui-icon layui-icon-shrink-right");
            $(".layui-nav-tree").find("li").each(function(em, ind) {
                $(this).find("cite").css("display", "");
                $(this).find("dl").css("display", "");
            });
        } else {
            if ($(this).attr("lay-href") != undefined) {
                var flag = true;
                
                var url = $(this).attr("lay-href");
                
                switch (url) {
                    case "chooseItem.html":
                    {
                        $("#subPage").attr("src", "chooseItem.html");
                        break;
                    }
                    case "createItem.html":
                    {
                        $("#subPage").attr("src", "createItem.html");
                        break;
                    }
                    case "paper.html":
                    {
                        $("#subPage").attr("src", "paper.html");
                        break;
                    }
                    case "exam.html":
                    {
                        $("#subPage").attr("src", "exam.html");
                        break;
                    }
                }
                
            }
        }
    });
});
})
