$("#nav-home").click(function() {
    window.location.href = "http://localhost:5500/frontend/list.html?id=" + urlParams.get("id");
});
$("#nav-profile").click(function() {
    window.location.href = "http://localhost:5500/frontend/profile.html?id=" + urlParams.get("id");
});
$("#nav-myMatches").click(function() {
    window.location.href = "http://localhost:5500/frontend/myMatches.html?id=" + urlParams.get("id");
});