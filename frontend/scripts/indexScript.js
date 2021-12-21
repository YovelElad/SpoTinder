const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userId = urlParams.get('id');
console.log("id=" + userId);

console.log(API_URL);

async function getUser(userId) {
    const response = await fetch(`${API_URL}/users/${userId}`);
    const data = await response.json();
    return data.data;
}

async function buildRow(potentialMatch, color) {
    const row = document.createElement('li');
    const otherUserId = potentialMatch.firstUser == userId ? potentialMatch.secondUser : potentialMatch.firstUser;
    console.log(otherUserId);
    const otherUser = await getUser(otherUserId);
    console.log(otherUser);
    row.id = otherUserId;
    const image = document.createElement('img');
    image.src = otherUser.image;
    row.append(image);
    const dataSpan = document.createElement('span');
    dataSpan.classList.add("dataSpan");
    const name = document.createElement('a');
    name.innerHTML = otherUser.name;
    name.href = `personalDetails.html?id=${otherUserId}`;
    dataSpan.append(name);
    row.append(dataSpan);
    const likeButton = document.createElement('button');
    likeButton.id = otherUserId+"_like";
    likeButton.classList.add("btn");
    likeButton.classList.add("btn-outline-success");
    likeButton.classList.add("pull-right");
    likeButton.classList.add("like");
    likeButton.innerHTML = "Like";
    row.append(likeButton);
    const unlikeButton = document.createElement('button');
    unlikeButton.id = otherUserId+"_unlike";
    unlikeButton.classList.add("btn");
    unlikeButton.classList.add("btn-outline-danger");
    unlikeButton.classList.add("pull-right");
    unlikeButton.classList.add("unlike");
    unlikeButton.innerHTML = "Unlike";
    row.append(unlikeButton);
    return row;
}


async function buildList(userPotentialMatches) {
    console.log(userPotentialMatches);
    if (userPotentialMatches.length == 0) {
        const noMatches = document.createElement('p');
        noMatches.innerHTML = "No matches found 😢";
        $("#list").html(noMatches);
    } else {
        const list = document.createElement('ul');
        list.id = 'listUl';
        userPotentialMatches.forEach(async (user) => {
            const row = await buildRow(user, "list");
            console.log(row);
            list.append(row);
        });
        document.getElementById('list').append(list);
    }
}



$.ajax({
    url: `${API_URL}/users/${userId}`,
    type: "GET",
    success: function(data) {
        buildList(data.data.potentialMatches || []);
    },
    dataType: "JSON"
  });

/*

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

*/


// $.ajax({
//     url: 'http://localhost:8888/users/' + 
// })