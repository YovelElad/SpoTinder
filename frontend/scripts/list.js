const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userId = urlParams.get('id');

const EMPTY_HEART_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16"><path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/></svg>';
const FILLED_HEART_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/></svg>'

async function getUser(userId) {
    const response = await fetch(`${API_URL}/users/${userId}`);
    const data = await response.json();
    return data.data;
}

async function getMatch(matchId) {
    const response = await fetch(`${API_URL}/users/${userId}/matches/${matchId}`);
    const data = await response.json();
    return data.data;
}

async function like(e) {
    e.preventDefault();
    const matchId = e.target.id.split("_")[0];
    const match = await getMatch(matchId);
    if (match.firstUser == userId) {
        match.firstUserLiked = true;
    } else {
        match.secondUserLiked = true;
    }
    $.ajax({
        url: `${API_URL}/users/${userId}/matches/${matchId}`,
        type: 'PUT',
        data: match,
        success: function(data) {
            console.log(data);
            if (data.status) {
                if (match.firstUserLiked && match.secondUserLiked) {
                    alert("It's A Match!");
                } else {
                    alert("like noted");
                }
                window.location.reload();

            } else {
                console.log(`URL:${API_URL}/users/${userId}/matches/${matchId}`, )
                    // alert(data.message);
            }
        }
    });
}

async function unlike(e) {
    e.preventDefault();
    const matchId = e.target.id.split("_")[0];
    console.log(matchId);
    const match = await getMatch(matchId);
    if (match.firstUser == userId) {
        match.firstUserLiked = false;
    } else {
        match.secondUserLiked = false;
    }
    $.ajax({
        url: `${API_URL}/users/${userId}/matches/${matchId}`,
        type: 'PUT',
        data: match,
        success: function(data) {
            console.log(data);
            if (data.status) {
                alert("unlike noted");
                window.location.reload();
            } else {
                console.log(`URL:${API_URL}/users/${userId}/matches/${matchId}`, )
                    // alert(data.message);
            }
        }
    });
}


async function buildRow(potentialMatch) {
    console.log(potentialMatch);
    const row = document.createElement('tr');
    const otherUserId = potentialMatch.firstUser == userId ? potentialMatch.secondUser : potentialMatch.firstUser;
    const otherUser = await getUser(otherUserId);
    row.id = otherUserId;
    const imageCell = document.createElement('td');
    imageCell.classList.add("text-center", "align-middle");
    const image = document.createElement('img');
    image.src = otherUser.image;
    image.classList.add('img-fluid', 'rounded-circle');
    image.style.maxWidth = '70px';
    imageCell.append(image);
    row.append(imageCell);
    const nameCell = document.createElement('td');
    nameCell.classList.add("text-center", "align-middle");
    nameCell.innerHTML = otherUser.name;
    row.append(nameCell);
    const scoreCell = document.createElement('td');
    scoreCell.classList.add("text-center", "align-middle");
    scoreCell.innerHTML = Math.floor(potentialMatch.score * 100) + "%";
    row.append(scoreCell);
    const favArtistCell = document.createElement('td');
    favArtistCell.classList.add("text-center", "align-middle");
    favArtistCell.innerHTML = otherUser.topArtists[0];
    row.append(favArtistCell);
    const favTrackCell = document.createElement('td');
    favTrackCell.classList.add("text-center", "align-middle");
    favTrackCell.innerHTML = otherUser.topTracks[0];
    row.append(favTrackCell);
    const likeCell = document.createElement('td');
    likeCell.classList.add("text-center", "align-middle");
    const likeButton = document.createElement('button');
    likeButton.id = potentialMatch._id + "_like";
    console.log(likeButton.id);
    if ((potentialMatch.firstUserLiked && potentialMatch.firstUser == userId) || (potentialMatch.secondUserLiked && potentialMatch.secondUser == userId)) {
        likeButton.classList.add('btn', 'btn-danger');
        likeButton.innerHTML = FILLED_HEART_ICON;
        likeButton.addEventListener('click', unlike);
    } else {
        likeButton.classList.add('btn', 'btn-outline-danger');
        likeButton.innerHTML = EMPTY_HEART_ICON;
        likeButton.addEventListener('click', like);
    }
    likeCell.append(likeButton);
    row.append(likeCell);


    if (potentialMatch.firstUserLiked && potentialMatch.secondUserLiked) {
        row.classList.add("match");
    }
    return row;
}


async function buildList(userPotentialMatches) {
    console.log(userPotentialMatches);
    if (userPotentialMatches.length == 0) {
        const noMatches = document.createElement('p');
        noMatches.innerHTML = "No matches found 😢";
        $("#list").html(noMatches);
    } else {
        const list = document.createElement('tbody');
        userPotentialMatches.forEach(async(user) => {
            const row = await buildRow(user);
            list.append(row);
        });
        document.getElementById('list').append(list);
    }
}


$(document).ready(async() => {
    $.ajax({
        url: `${API_URL}/users/${userId}/matches`,
        type: "GET",
        success: function(data) {
            buildList(data.data || []);
        },
        dataType: "JSON"
    });
});


$("#profileLink").click(function() {
    console.log("profile");
    $(this).attr("href", "personalDetails.html?id=" + userId);
})