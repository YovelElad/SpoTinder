$(document).ready(function() {
    $("#click").click(function() {
        // console.log("click");
        // $.get('localhost:8888/users', function(data, status) {
        //         console.log("hiiiii");
        //         console.log(data);
        //     })
        console.log("1");
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8888/users',
            success: function(data) {
                console.log(data);
            }
        });
    });
    console.log("2");

});