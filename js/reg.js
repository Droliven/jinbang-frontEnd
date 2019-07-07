$(function(){
  // var domin = "http://11pm.top:8081/jinbang";
  var domin = "http://localhost:8081/jinbang";

  $(document).ready(function() {
    $.ajax({
      url: domin + '/registradio',
      type: 'get',
      xhrFields: {
        withCredentials: true
      },
      contentType: "application/json",
      success: function(da){
        if(data.state == "success") {
          console.log(da);
          const pdom = "<p class='p-input pos'></p>";
          const dom = "<label for='管理员'>管理员</label><input type='radio' name='role' value='管理员'>";
          const allroles = da.data;
          allroles.forEach(element => {
            $("#rolesradio").append($(pdom));

            let newdom = $(dom);
            newdom[0].innerHTML = element;
            newdom[0].htmlFor = element;
            newdom[1].value = element;
            console.log(newdom);
            $("#rolesradio p:last").append(newdom);
          })  
        } else {
          console.log("err")
        }
      },
      error: function(da){
          console.log(da);
      }
    })
  });

	$(".lang-btn").click(function(){
		// var type = 'phone';
		const inp = $.trim($('#tel').val());
    const pass = $.trim($('#passport').val());
    const role = $("input[name='role']:checked").val();

    $.ajax({
            url: domin + '/regist',
            type: 'post',
            xhrFields: {
              withCredentials: true
            },
            data: JSON.stringify({data: {name:inp, pwd: pass, role:role}}),
            dataType: 'JSON',
            contentType: "application/json",
            success: function(da){
              if(data.state == "success") {
                console.log(da);
                window.location.href = "login.html";
              } else {
                console.log("err");
              }
            },
            error: function(da){
                console.log(da);
            }
    });
	});
});