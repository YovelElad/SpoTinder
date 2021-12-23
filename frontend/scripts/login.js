$("#registerForm").submit(function(e){
    e.preventDefault();
    var formData = {
        password: $('#password').val(),
        email: $('#email').val(),
    };
    console.log(formData);

    $.ajax({
        url: `${API_URL}/login?username=${formData.email}`,
        type: 'POST',
        data: formData,
        success: function(data){
            if(data.status){
                console.log(data.data);
                window.location.href = "/frontend/list.html?id=" + data.data._id;
            } else {
                alert(data.message);
                window.location.href = "/frontend/login.html";

            }

        }
    });
});
