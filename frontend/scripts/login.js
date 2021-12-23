$("#registerForm").submit(function(e){
    e.preventDefault();
    const formData = {
        password: $('#password').val(),
        email: $('#email').val(),
    };

    $.ajax({
        url: `${API_URL}/login?username=${formData.email}`,
        type: 'POST',
        data: formData,
        success: function(data){
            if(data.status){
                window.location.href = "/frontend/list.html?id=" + data.data._id;
            } else {
                alert(data.message);
                window.location.href = "/frontend/login.html";

            }

        }
    });
});
