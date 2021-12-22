$("#nav-home").click(function() {
    window.location.href = "/list.html?id=" + urlParams.get("id");
});
$("#nav-profile").click(function() {
    window.location.href = "/profile.html?id=" + urlParams.get("id");
});
$("#nav-myMatches").click(function() {
    window.location.href = "/myMatches.html?id=" + urlParams.get("id");
});