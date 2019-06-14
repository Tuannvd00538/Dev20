var ownerid = localStorage.getItem('id');
listGroup(ownerid);

function listGroup(ownerid) {
    $.ajax({
        url: '/_api/v1/group/'+ownerid,
        type: "GET",
        success: function(response) {
            var result = response.result;
            var listGrLocal = [];
            result.forEach(element => {
                $.ajax({
                    url: '/_api/v1/group/detail/' + element._id,
                    async: true,
                    type: "GET",
                    success: function(responseGr) {

                        listGrLocal.push(responseGr.result);

                        localStorage.setItem('res', JSON.stringify(listGrLocal));
                        
                        
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        
                    }
                });
            });
            if(result != null){
                var contentTable = '';
                for(var i = 0; i < result.length; i++) {
                    contentTable += '<div class="col-md-4 col-sm-6 col-xs-12">';
                    contentTable += '<a href="index.html?id='+result[i]._id+'" class="card bg-danger d-block mb-3 overflow-hidden">';
                    contentTable += '<div class="card-body">';
                    contentTable += '<blockquote class="blockquote mb-0">';
                    contentTable += '<p class="text-light ws-nowrap">'+result[i].name+'</p>';
                    contentTable += '</blockquote>';
                    contentTable += '</div>';
                    contentTable += '</div>';
                }
                $('.list_group').html(contentTable);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.href = "index.html?action=error";
        }
    });
}
