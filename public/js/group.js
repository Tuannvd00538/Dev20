var ownerid = localStorage.getItem('id');
listGroup(ownerid);

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};    

var id_group = getUrlParameter('id');
console.log(id_group);
if (id_group != null) {}

$('.btn-create-group').click(() => {
    var name = $('#name').val();
    
    var dataPost = {
        "name": name,
        "ownerId": ownerid
    }
    console.log(dataPost);
    if (name.length > 0) {
        $.ajax({
            url: '/_api/v1/group/create',
            type: "POST",
            data: dataPost,
            success: function(response) {
                console.log(response.result);
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
            if(result != null){
                var contentTable = '';
                for(var i = 0; i < result.length; i++) {
                    contentTable += '<tr>';
                    contentTable += '<td>'+result[i].name+'</td>';
                    contentTable += '<td><a href="group.html?id='+result[i]._id+'">Edit</a><a href="groupdetail.html?id='+result[i]._id+'">Detail</a></td>';
                    contentTable += '</tr>';
                }
                $('.table-group').html(contentTable);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.href = "index.html?action=error";
        }
    });
}