var ownerid = localStorage.getItem('id');
listGroup(ownerid);
var id_group = getUrlParameter('id');
console.log(id_group);
$('#btn-group').click(() => {
    var name = $('#name').val();
    
    var dataPost = {
        "name": name,
        "owrnerId": ownerid
    }
    console.log(dataPost);
    if (name.length > 0) {
        $.ajax({
            url: '/_api/v1/group/create',
            type: "POST",
            data: dataPost,
            success: function(response) {
                window.location.href = "group.html?action=success";
            },
            error: function(jqXHR, textStatus, errorThrown) {
                window.location.href = "group.html?action=error";
            }
        });
    }
});

function listGroup(ownerid) {
    $.ajax({
        url: '/_api/v1/group/'+ownerid,
        type: "GET",
        success: function(response) {
            var result = response.result;
            console.log(result);
            if(result != 0){
                var contentTable = '<tr>';
                for(var i = 0; i < result.length; i++) {
                    contentTable += '<td>'+result[i].name+'</td>';
                    contentTable += '<td><a href="group.html?id='+result[i]._id+'">Edit</a></td>';
                }
                contentTable += '</tr>';
                console.log(contentTable);
                $('.table-group').html(contentTable);
            }
            $()
        },
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.href = "index.html?action=error";
        }
    });
}