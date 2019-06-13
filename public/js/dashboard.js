var ownerid = localStorage.getItem('id');
listGroup(ownerid);

function listGroup(ownerid) {
    $.ajax({
        url: '/_api/v1/group/'+ownerid,
        type: "GET",
        success: function(response) {
            var result = response.result;
            console.log(result);
            if(result != null){
                var contentTable = '';
                for(var i = 0; i < result.length; i++) {
                    contentTable += '<div class="col-md-4 col-sm-6 col-xs-12">';
                    contentTable += '<a href="index.html?id='+result[i]._id+'" class="btn btn-lg btn-outline-primary btn-block d-block mb-3 overflow-hidden">';
                    contentTable += '<span id="payment-button-amount">'+result[i].name+'</span>';
                    contentTable += '</a></div>';
                }
                $('.list_group').html(contentTable);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.href = "index.html?action=error";
        }
    });
}
