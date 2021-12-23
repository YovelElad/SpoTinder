const userId = urlParams.get('id');
let user = null;

function buildProfile(user) {
    $("#profilePic").attr("src", user.image);
    $("#profileName").text(user.name);
    $("#profileEmail").text(user.email);
    $("input[name='name']").val(user.name);
    $("input[name='email']").val(user.email);
    $("input[name='password']").val(user.password);
    $("input[name='country']").val(user.country);
    if(user.gender == "male") {
        $("#maleRadio").prop("checked", true);
    } else {
        $("#femaleRadio").prop("checked", true);
    }
    if(user.interestedIn.includes("male")) {
        $("#maleCheckBox").prop("checked", true);
    }
    if(user.interestedIn.includes("female")) {
        $("#femaleCheckBox").prop("checked", true);
    }
}


$("#profileForm").submit(function(e) {
    e.preventDefault();
    const preferences = [];
    $.each($("input[name='genderPreference']:checked"), function() {
        preferences.push($(this).val());
    });
    user.name = $("input[name='name']").val();
    user.email = $("input[name='email']").val();
    user.password = $("input[name='password']").val();
    user.country = $("input[name='country']").val();
    user.interestedIn = preferences;
    if($("#maleRadio").is(":checked")) {
        user.gender = "male";
    } else {
        user.gender = "female";
    }

    $.ajax({
        url: `${API_URL}/users/${userId}`,
        type: 'PUT',
        data: user,

        success: function(data) {
            if (data.status) {
                buildProfile(user);
            } else {
                alert(data.message);
            }

        }
    });
});


$(document).ready(async() => {
    $.ajax({
        url: `${API_URL}/users/${userId}`,
        type: "GET",
        success: function(data) {
            if(data.status) {
                user = data.data;
                buildProfile(user);
            } else {
                alert(data.message);
            }
        },
        dataType: "JSON"
    });
});