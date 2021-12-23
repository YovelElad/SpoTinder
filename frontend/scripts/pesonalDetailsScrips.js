const userId = urlParams.get('id');
const urlUser = urlParams.get('user');

async function getScore(user) {
    const responds = await fetch(`${API_URL}/users/${user._id}/matches`);
    const matches = await responds.json();
    console.log(matches);
    const match = matches.data.find(m => m.firstUser == userId || m.secondUser == userId);
    console.log(match.score);
    return match.score;
}

function buildHeader(user) {
    const title = document.createElement('h1');
    const header = $("header");
    title.innerHTML = `${user.name.split(" ")[0]}'s Profile`;
    header.append('<br>');
    header.append(title);
    header.append('<br>');
}

async function buildProfile(user) {
    const mainDetails = $("#personalDetails > #mainDetails");
    const artists = $("#personalDetails > #moreDetails > #artists");
    const tracks = $("#personalDetails > #moreDetails > #tracks");
    const userName = document.createElement('h2');
    userName.innerHTML = user.name;
    const userImg = document.createElement('img');
    userImg.src = user.image;
    mainDetails.append(userName);
    mainDetails.append(userImg);
    const scoreTitle = document.createElement('p');
    scoreTitle.id = "scoreTitle";
    scoreTitle.innerHTML = "Your Score:";
    mainDetails.append(scoreTitle);
    const score = document.createElement('p');
    score.id = "matchScore";
    score.innerHTML = Math.round(await getScore(user) * 100) + "%";
    mainDetails.append(score);
    const artistsTitle = document.createElement('h6');
    artistsTitle.innerHTML = `${user.name.split(" ")[0]}'s Top 5 Artists:`
    artistsTitle.id = "artistsTitle";
    artists.append(artistsTitle);
    const artistsUL = document.createElement('ul');
    artistsUL.id = "ulArtists";
    for (let i = 0; i < 5; i++) {
        const artistsLI = document.createElement('li');
        artistsLI.innerHTML = user.topArtists[i];
        artistsUL.append(artistsLI);
    }
    artists.append(artistsUL);
    const tracksTitle = document.createElement('h6');
    tracksTitle.innerHTML = `${user.name.split(" ")[0]}'s Top 5 Tracks:`
    tracksTitle.id = "tracksTitle";
    tracks.append(tracksTitle);
    const tracksUL = document.createElement('ul');
    tracksUL.id = "ulArtists";
    for (let i = 0; i < 5; i++) {
        const tracksLI = document.createElement('li');
        tracksLI.innerHTML = user.topTracks[i];
        tracksUL.append(tracksLI);
    }
    tracks.append(tracksUL);
}

$.ajax({
    type: 'GET',
    url: `${API_URL}/users/` + urlUser,
    success: function(result) {

        buildProfile(result.data);
        buildHeader(result.data);

    }
})


$("#homePageLink").click(function() {
    console.log("profile");
    $(this).attr("href", "list.html?id=" + userId);
})