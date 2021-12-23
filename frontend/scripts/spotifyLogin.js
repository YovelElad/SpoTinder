$("#spotify").submit(function(e) {
    e.preventDefault();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const userId = urlParams.get('id');
    $.ajax({
        url: `${API_URL}/spotify/login/${userId}`,
        type: 'GET',
        processData: false,
        contentType: false,
        success: function(data){
            if(data.status){
                window.location.href =  data.data;
            }
        }
    });
})