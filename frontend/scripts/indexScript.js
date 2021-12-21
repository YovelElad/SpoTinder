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

console.log("id=" + id);



$.ajax({
    type: 'GET',
    url: 'http://localhost:8888/users',
    success: function(result) {
        console.log(result);
        console.log(result.data[0].name);
        let i = 0;
        let myIndex = 0;
        $.each(result.data, function(key, val) {
                if (result.data[i]._id == id) {
                    myIndex = i;
                    console.log("index=" + myIndex);
                }
                $("#listUl").append('<li id="' + result.data[i]._id + '"><img src="' + result.data[i].image + '" /><span id="like"><a href="personalDetails.html?index=' + i + '"><b>' + result.data[i].name +
                    '</b></a></span><button id="' + result.data[i]._id + '_like" type="button" class="btn btn-outline-success pull-right like">Like</button>' +
                    '<button id="' + result.data[i].id + '_unlike" type="button" class="btn pull-right btn-outline-danger unlike">Unlike</button>' +
                    '</li>');
                if (i % 2) {
                    $("#" + result.data[i].id).css("background-color", "#c9fada");
                }
                i++;
            })
            // console.log(result.data[9].name);
        i = 0;
        $.each(result.data, function(key, val) {
            // Hendling the 'like' button
            $("#" + result.data[i].id + "_like").click(function() {
                for (let j = 0; j < result.data.length; j++) {
                    console.log(this.id.split("_")[0]);
                    if (result.data[j].id == this.id.split("_")[0]) {
                        let k = 0,
                            firstTimeLike = true,
                            isMatched = false;
                        //check my likes
                        for (k = 0; k < result.data[myIndex].likedMe.length; k++) {
                            if (result.data[j]._id == result.data[myIndex].likedMe[k]) {
                                alert("It's a match!");

                                firstTimeLike = false;
                                for (let matchesIndex = 0; matchesIndex < result.data[myIndex].matches.length; matchesIndex++) {
                                    if (result.data[myIndex].matches[matchesIndex] == result.data[j]._id) {
                                        isMatched = true;
                                        break;
                                    }
                                }
                                if (!isMatched) {
                                    let data = {
                                        id: id
                                    }
                                    $.ajax({
                                        url: 'http://localhost:8888/users/match/' + result.data[j]._id,
                                        type: 'PUT',
                                        data: data,
                                        success: function(docs) {
                                            console.log(docs);
                                        }
                                    })
                                    data = {
                                        id: result.data[j]._id
                                    }
                                    $.ajax({
                                        url: 'http://localhost:8888/users/match/' + id,
                                        type: 'PUT',
                                        data: data,
                                        success: function(docs) {
                                            console.log(docs);
                                        }
                                    })
                                    break;
                                }
                            }
                        }
                        //check his likes
                        for (k = 0; k < result.data[j].likedMe.length; k++) {
                            if (id == result.data[j].likedMe[k]) {
                                alert("we know you like them :)");
                                firstTimeLike = false;
                                break;
                            }
                        }
                        if (firstTimeLike) {
                            let data = {
                                id: id
                            }
                            $.ajax({
                                url: 'http://localhost:8888/users/like/' + result.data[j]._id,
                                type: 'PUT',
                                data: data,
                                success: function(docs) {
                                    console.log(docs);
                                }
                            })
                        }
                        $("#" + result.data[j]._id).remove();
                    }
                }
            })


            //Hendling the 'unlike' button
            $("#" + result.data[i].id + "_unlike").click(function() {
                for (let j = 0; j < result.data.length; j++) {
                    console.log(this.id.split("_")[0]);
                    if (result.data[j].id == this.id.split("_")[0]) {
                        $("#" + result.data[j]._id).remove();
                    }
                }
            })
            i++;
        })
    }
});




// $.ajax({
//     url: 'http://localhost:8888/users/' + 
// })