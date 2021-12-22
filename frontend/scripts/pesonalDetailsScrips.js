//Catch the user id from query
// let id = 0;
// const sPageURL = window.location.search.substring(1);
// console.log(sPageURL);
// let sURLVariables = sPageURL.split('&'),
//     sParameterName = "",
//     i = 0;
// console.log(sURLVariables);
// for (i = 0; i < sURLVariables.length; i++) {
//     sParameterName = sURLVariables[i].split('=');
//     console.log(sParameterName[1]);
//     id = sParameterName[1];
// }
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userId = urlParams.get('id');
console.log("id=" + userId);

// console.log(id);

function getMyIndex(data, id) {
    for (leti = 0; i < data.length; i++) {
        if (id == data[i]._id) {
            return i;
        }
        console.log(i);
    }
}

$.ajax({
    type: 'GET',
    url: 'http://localhost:8888/users/' + userId,
    success: function(result) {

        console.log(result);
        $("#personalDetails > #mainDetails").append('<h1>' + result.data.name + '</h1>');
        $("#personalDetails > #mainDetails").append('<img src="' + result.data.image + '">');


        $("#personalDetails > #moreDetails > #artists").append('<h6 id="artistsTitle">Your Top 5 Artists:</h6>');
        $("#personalDetails > #moreDetails > #artists").append('<ul id="ulArtists">');
        for (let i = 0; i < 5; i++) {
            console.log(result.data.topArtists[i]);
            $("#personalDetails > #moreDetails > #artists > #ulArtists").append('<li>' + result.data.topArtists[i] + '</li>');
        }
        $("#personalDetails > #moreDetails > #artists").append('</ul><br>');



        $("#personalDetails > #moreDetails > #tracks").append('<h6 id="tracksTitle">Your Top 5 Tracks:</h6>');
        $("#personalDetails > #moreDetails > #tracks").append('<ul id="ulTracks">');
        for (let i = 0; i < 5; i++) {
            console.log(result.data.topTracks[i]);
            $("#personalDetails > #moreDetails > #tracks > #ulTracks").append('<li>' + result.data.topTracks[i] + '</li>');
        }
        $("#personalDetails > #moreDetails > #tracks").append('</ul>');
    }
})

$("#homePageLink").click(function() {
    console.log("profile");
    $(this).attr("href", "list.html?id=" + userId);
})