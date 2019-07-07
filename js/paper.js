$(function(){
    // 显示试卷内容
    function getPaper(data) {
        data.forEach(function(item) {
            var txt1 = "<p class='q2'>";
            var txt2 = "</p>";
            $(".word").append(txt1 + item.item.content + txt2);
            $(".word").append(txt1 + item.answer.content + txt2);
            $(".word").append("<br>");
        })
    }

    // 显示所有试卷名称
    function getALL(data) {
        $("#q1").append("<table class='layui-table'><colgroup><col width='150'><col width='200'><col></colgroup></table>");
        var table1 = "<thead><tr><th>试卷序号</th><th>试卷名称</th><th>组卷人</th></tr> </thead>";
        var tbody = "<tbody>";
        //   <td>贤心</td>
        //   <td>2016-11-29</td>
        //   <td>人生就像是一场修行</td>
        var tend = "</tbody>";
        $(".layui-table").append(table1);
        data.forEach(function(item) {
            //console.log(item);
            var ten = "<tr><td>" + item.pid + "</td>";
            var tdt = "<td>" + item.title + "</td>";
            var tdb = "<td>" + item.builder + "</td></tr>";
            $(".layui-table").append(ten + tdt + tdb);
        })
    }

    $(function() {
        $("#getword").click(function(event) {
            $(".word").wordExport($("#exmatitle").val());
        });
    })

    layui.use('layer', function() {
        var layer = layui.layer; // 引入layer
        $(".layui-btn").click(function() {
            var para = $("#search").val();
            if (!para) {
                // 未输入搜索内容
                if ($(".layui-table")) {
                    console.log($(".layui-table"));
                    $(".layui-table").remove();
                }
                // 删除已有试卷
                if ($(".q2")) {
                    $(".q2").each(function() {
                        $(".q2").remove();
                    })
                    $(".word").find('br').remove();
                    $("#examtitle").text("试卷内容");
                }
                getALL(paper.allPaperDetail);
                layer.msg("请输入搜索内容！");
            } else {
                console.log(para);
                if ($(".layui-table")) {
                    console.log($(".layui-table"));
                    $(".layui-table").remove();
                }
                var list = [];
                var flag = 0;
                var cont = [];
                list = paper.allPaperDetail; // 所有题目列表
                list.forEach(function(item) {
                    if (para == item.title) {
                        flag = 1;
                        cont = item.buildpapers;
                        $("#examtitle").text(item.title);
                        getPaper(cont);
                    }
                })
                if (flag == 0) {
                    layer.msg("没有符合条件的试卷！");
                    $("#search").val("");
                }
            }
        })
    });
})