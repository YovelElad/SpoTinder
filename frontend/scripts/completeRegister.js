//Get the user id from url
let id = 0;
const sPageURL = window.location.search.substring(1);
let sURLVariables = sPageURL.split('&'),
    sParameterName = "",
    i = 0;
for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');
    id = sParameterName[1];

}
console.log("id=" + id);

$("#completeRegisterForm").submit(function(e) {
    console.log("nu maaaa");
    e.preventDefault();
    let preferences = [];
    $.each($("input[name='genderPreference']:checked"), function() {
        preferences.push($(this).val());
    });
    let formData = {
        gender: $("input[name='gender']:checked").val(),
        interestedIn: preferences

    }
    console.log("formData " + formData);

    $.ajax({
        url: "http://localhost:8888/users/gender/" + id,
        type: 'PUT',
        data: formData,
        success: function(data) {
            // if (data.status) {
            console.log("url:" + "http://localhost:8888/users/gender/" + id);
            console.log("status:" + data.status);
            window.location.href = "./index.html?id=" + id;
            // }
        }
    })
})