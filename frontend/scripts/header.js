$("#nav-home").click(function() {
    window.location.href = "/frontend/list.html?id=" + urlParams.get("id");
});
$("#nav-profile").click(function() {
    window.location.href = "/frontend/personalDetails.html?id=" + urlParams.get("id");
});
$("#nav-myMatches").click(function() {
    window.location.href = "/frontend/myMatches.html?id=" + urlParams.get("id");
});