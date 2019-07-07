$(function(){

})

const domin = "http://localhost:8081/jinbang";
// const domin = "http://11pm.top:8081/jinbang";

$.ajax({
    type: "POST",
    url: domin + "/itemradio",
    xhrFields: {
        withCredentials: true
    },
    data: JSON.stringify({session: window.localStorage.getItem("session"), data: {userdetail: window.localStorage.getItem("userdetail"), data: ?}}),
    dataType: 'JSON',
    contentType: "application/json",
    success: function(da) {
        if(da.state == "success") {
            window.localStorage.setItem("session", da.session);

        } else {
            console.log(da.msg);
        }
    },
    error: (da) => {
        console.log(da);
    }
})



Map<String, Object> map = new HashMap<String, Object>(@RequestBody JSONObject request, HttpSession session);
    Map<String, Object> map = new HashMap<String, Object>();

    String clientsession = request.get("session").toString();

    JSONObject data = JSON.parseObject(request.get("data").toString());
    JSONObject userdetail = data.getJSONObject("userdetail");
    Set<String> roles = new HashSet<>(JSON.parseArray(userdetail.get("shiroRoles").toString(), String.class));

    JSONObject realdata = data.getJSONObject("data");

    String name = clientsession.split(",")[0];
    if(session.getAttribute(name) != null){
        if(roles.contains("itemradio")) {
            // 业务代码
            System.out.println("itemradio");
            List<HashMap> itemlist = itemService.itemradio();

            String serverSession = name + "," + System.currentTimeMillis();
            session.setAttribute(name, serverSession);
            map.put("data", itemlist);
            map.put("state", "success");
            map.put("session", serverSession);
        } else {
            map.put("state", "err");
            map.put("msg", "没有权限");
        }
    } else {
        map.put("state", "err");
        map.put("msg", "未登录");
    }
    return map;
}