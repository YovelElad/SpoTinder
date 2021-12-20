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
        $("#personalDetails > #mainDetails").append('<h1>' + result.data[id].name + '</h1>');
        $("#personalDetails > #mainDetails").append('<img src="' + result.data[id].image + '">');


        $("#personalDetails > #moreDetails > #artists").append('<h6 id="artistsTitle">Your Top 5 Artists:</h6>');
        $("#personalDetails > #moreDetails > #artists").append('<ul id="ulArtists">');
        for (let i = 0; i < 5; i++) {
            console.log(result.data[id].topArtists[i]);
            $("#personalDetails > #moreDetails > #artists > #ulArtists").append('<li>' + result.data[id].topArtists[i] + '</li>');
        }
        $("#personalDetails > #moreDetails > #artists").append('</ul><br>');



        $("#personalDetails > #moreDetails > #tracks").append('<h6 id="tracksTitle">Your Top 5 Tracks:</h6>');
        $("#personalDetails > #moreDetails > #tracks").append('<ul id="ulTracks">');
        for (let i = 0; i < 5; i++) {
            console.log(result.data[id].topTracks[i]);
            $("#personalDetails > #moreDetails > #tracks > #ulTracks").append('<li>' + result.data[id].topTracks[i] + '</li>');
        }
        $("#personalDetails > #moreDetails > #tracks").append('</ul>');
    }
})