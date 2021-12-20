$("#registerForm").submit(function(e){
    e.preventDefault();
    // var form = $("#registerForm");
    var formData = new FormData(this);
    console.log(formData);

    $.ajax({
        url: this.action,
        type: this.method,
        data: formData,
        processData: false,
        contentType: false,
        success: function(data){
            console.log(data);
            if(data.status){
                // redirect to login page
                window.location.href = "/frontend/spotifyLogin.html?id=" + data.data._id;
            }

        }
    });
});
