// $(document).ready(function() {
//     $("#click").click(function() {
// console.log("click");
// $.get('localhost:8888/users', function(data, status) {
//         console.log("hiiiii");
//         console.log(data);
//     })
console.log("1");
$.ajax({
    type: 'GET',
    url: 'http://localhost:8888/users',
    success: function(result) {
        console.log(result);
        console.log(result.data[0].name);
        let i = 0;
        $.each(result, function(key, val) {
            $("#listUl").append('<li id="' + result.data[i]._id + '"><img src="https://i.scdn.co/image/ab6775700000ee85106f6ba0ca11f991af308b1c" /><span id="like"><a href="personalDetails.html?index=' + i + '"><b>' + result.data[i].name +
                '</b></a></span><button id="' + result.data[i]._id + 'like" type="button" class="btn btn-outline-success pull-right like">Like</button>' +
                '<button id="' + result.data[i].id + 'unlike" type="button" class="btn pull-right btn-outline-danger unlike">Unlike</button>' +
                '</li>');
            if (i % 2) {
                $("#" + result.data[i].id).css("background-color", "#c9fada");
            }
            i++;
        })
    }
});
//     });
//     console.log("2");

// });