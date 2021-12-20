$(document).ready(function() {
    //Get the user id from url
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





    //Create the list from JSON file
    const myData = $.getJSON("./data/test.json", function(data) {
        let i = 0;
        $.each(data, function(key, val) {
            $("#listUl").append('<li id="' + data[i].id + '"><img src="https://i.scdn.co/image/ab6775700000ee85106f6ba0ca11f991af308b1c" /><span id="like"><b>' + data[i].name +
                '</b></span><button id="' + data[i].id + 'like" type="button" class="btn btn-outline-success pull-right like">Like</button>' +
                '<button id="' + data[i].id + 'unlike" type="button" class="btn pull-right btn-outline-danger unlike">Unlike</button>' +
                '</li>');
            if (i % 2) {
                $("#" + data[i].id).css("background-color", "#c9fada");
            }
            i++;
        })


        i = 0, j = 0;
        $.each(data, function(key, val) {
            console.log(data[i]);
            let idStr = data[i].id.toString() + "like";
            $("#" + data[i].id + "like").click(function() {
                // if (this.id == idStr) {
                console.log(i);
                for (let j = 0; j < data.length; j++) {
                    if (data[j].id == parseInt(this.id)) {
                        let k = 0;
                        for (k = 0; k < data[j].likes.length; k++) {
                            if (id == data[j].likes[k]) {
                                alert("We know you like them :)");
                                break
                            }
                        }
                        if (k == data[j].likes.length)
                            data[j].likes.push(id);
                    }
                }
                console.log(data);
                // }
            })
            i++;
        })

    });




    //Register functionality
    $("#connectToSpotify").click(function() {
        $(this).css("display", "none");
        $("#register > .container > .card").css('height', '380px');
        $("#register > .container > .card").css('width', '350px');
        $("#register .form-group").removeClass("d-none");
    })


    $("#register button").click(function() {
        const pass = $("#register #password").value;
        console.log(pass);
    })

});