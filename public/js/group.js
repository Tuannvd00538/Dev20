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

if (id_group != null) {
    console.log(id_group);
    getDetailGroup(id_group);
}

$(document).on('click', '#btn-create-group', () => {
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

$(document).on('click', '#btn-edit-group', () => {
    var name = $('#name').val();
    
    var dataPost = {
        "name": name,
    }
    console.log(dataPost);
    if (name.length > 0) {
        $.ajax({
            url: '/_api/v1/group/detail/'+id_group,
            type: "PUT",
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

$(document).on('click', '.delete-group', function () {
    var rowthis = $(this).parents("tr");
    var groupid = $(this).find('span').text();
    if(confirm("Are you sure you want to delete the group, the patients will also be deleted from the group")) {
        $.ajax({
            url: '/_api/v1/group/detail/'+groupid,
            type: "DELETE",
            success: function(response) {
                console.log(response);
                rowthis.attr('class', 'd-none');
                
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // window.location.href = "index.html?action=error";
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
                    contentTable += '<td class="d-flex">';
                    contentTable += '<a href="groupdetail.html?id='+result[i]._id+'" class="btn btn-sm btn-primary mr-2">Detail</a>';
                    contentTable += '<a href="group.html?id='+result[i]._id+'" class="btn btn-sm btn-warning mr-2">Edit</a>';
                    contentTable += '<button class="btn btn-sm btn-danger delete-group">Delete<span class="group-id d-none">'+result[i]._id+'</span></button>';
                    contentTable += '</td>';
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

function deletegroup(groupId) {
    if(confirm("Are you sure you want to delete the group, the patients will also be deleted from the group")) {
        alert('ok');
    }
    // $.ajax({
    //     url: '/_api/v1/group/detail/'+groupid,
    //     type: "GET",
    //     success: function(response) {
    //         var result = response.result;
    //         if(result != null){
    //             var nameGroup = result[0].name;
    //             $('#name').val(nameGroup);
    //             $('.title-form-group').text('Edit Group');
                
    //             $('#btn-create-group i').attr('class', 'fa fa-save fa-lg');
    //             $('#btn-create-group span').text('Edit');
    //             $('#btn-create-group').attr('id', 'btn-edit-group');
    //         }
    //     },
    //     error: function(jqXHR, textStatus, errorThrown) {
    //         // window.location.href = "index.html?action=error";
    //     }
    // });
}

function getDetailGroup(groupid) {
    $.ajax({
        url: '/_api/v1/group/detail/'+groupid,
        type: "GET",
        success: function(response) {
            var result = response.result;
            if(result != null){
                var nameGroup = result[0].name;
                $('#name').val(nameGroup);
                $('.title-form-group').text('Edit Group');
                
                $('#btn-create-group i').attr('class', 'fa fa-save fa-lg');
                $('#btn-create-group span').text('Edit');
                $('#btn-create-group').attr('id', 'btn-edit-group');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // window.location.href = "index.html?action=error";
        }
    });
 }