$("#spotify").submit(function(e) {
    e.preventDefault();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const userId = urlParams.get('id');
    $.ajax({
        url: `http://localhost:8888/spotify/login/${userId}`,
        type: 'GET',
        processData: false,
        contentType: false,
        success: function(data){
            console.log(data);
            if(data.status){
                // redirect to login page with userId
                window.location.href =  data.data;
            }
        }
    });
})