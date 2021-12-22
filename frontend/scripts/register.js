$("#registerForm").submit(function(e) {
    e.preventDefault();
    let preferences = [];
    $.each($("input[name='genderPreference']:checked"), function() {
        preferences.push($(this).val());
    });
    let formData = {
        username: $('#username').val(),
        password: $('#password').val(),
        email: $('#email').val(),
        gender: $("input[name='gender']:checked").val(),
        interestedIn: preferences
    };
    $.ajax({
        url: `${API_URL}/users`,
        type: "POST",
        data: formData,
        success: function(data) {
            console.log(data);
            if (data.status) {
                console.log(data.data);
                window.location.href = "/frontend/spotifyLogin.html?id=" + data.data._id;
            } else {
                alert(data.message);
                window.location.href = "/frontend/login.html";
            }
        }
    });
});