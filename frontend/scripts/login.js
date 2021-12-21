$("#registerForm").submit(function(e){
    e.preventDefault();
    var formData = {
        password: $('#password').val(),
        email: $('#email').val(),
    };
    console.log(formData);

    $.ajax({
        url: this.action + "?username=" + formData.email,
        type: this.method,
        data: formData,
        success: function(data){
            if(data.status){
                console.log(data.data);
                window.location.href = "/frontend/?id=" + data.data._id;
            } else {
                alert(data.message);
                window.location.href = "/frontend/login.html";

            }

        }
    });
});
