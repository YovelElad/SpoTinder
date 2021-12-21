$("#registerForm").submit(function(e){
    e.preventDefault();
    var formData = {
        username: $('#username').val(),
        password: $('#password').val(),
        email: $('#email').val(),
    };
    console.log(formData);

    $.ajax({
        url: this.action,
        type: this.method,
        data: formData,
        success: function(data){
            if(data.status){
                // redirect to login page
                console.log(data.data);
                window.location.href = "/frontend/spotifyLogin.html?id=" + data.data._id;
            } else {
                alert(data.message);
                window.location.href = "/frontend/login.html";

            }

        }
    });
});
