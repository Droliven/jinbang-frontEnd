$(function(){
	function checkAccount(username){
		if (username == '') {
			$('.num-err').removeClass('hide').find("em").text('请输入账户');
			return false;
		} else {
			$('.num-err').addClass('hide');
			return true;
		}
	}

	function checkPass(pass){
		if (pass == '') {
			$('.pass-err').removeClass('hide').text('请输入密码');
			return false;
		} else {
			$('.pass-err').addClass('hide');
			return true;
		}
	}

	$(".log-btn").click(function(){
		// var type = 'phone';
		var inp = $.trim($('#num').val());
		var pass = $.trim($('#pass').val());
		if (checkAccount(inp) && checkPass(pass)) {
			
			// var domin = "http://11pm.top:8081/jinbang";
			var domin = "http://localhost:8081/jinbang";

			$.ajax({
							url: domin + '/home',
							type: 'post',
							xhrFields: {
								withCredentials: true
							},
							data: JSON.stringify({data: {name:inp, pwd: pass}}),
							dataType: 'JSON',
							contentType: "application/json",
							success: function(da){
									if(da.state == "success") {
										console.log(da);
										window.localStorage.setItem("name", inp);
										window.localStorage.setItem("userdetail", JSON.stringify(da.data));
										window.localStorage.setItem("session", da.session);
										window.location.href = "home.html";
									} else {
										console.log(da.msg);
									}
									
							},
							error: function(da){
									console.log(da);
							}
			});
		}
	});
});