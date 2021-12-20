//Catch the user id from query
let id = 0;
const sPageURL = window.location.search.substring(1);
console.log(sPageURL);
let sURLVariables = sPageURL.split('&'),
    sParameterName = "",
    i = 0;
console.log(sURLVariables);
for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');
    console.log(sParameterName[1]);
    id = sParameterName[1];
}

$.ajax({
    type: 'GET',
    url: 'http://localhost:8888/users',
    success: function(result) {
        $("#personalDetails").append('<h1>' + result.data[id].name + '</h1>');

    }
})