
var ownerid = localStorage.getItem('id');
listGroup(ownerid);


$('#button-create').click(() => {
    var username = $('#username').val();
    var password = $('#password').val();
    var fullname = $('#fullname').val();
    var groupId = $('#select-group').val();
    if (username.length == 0) {
        
    } else if (password.length == 0) {
        
    } else if (fullname.length == 0) {
        
    };
    var register = {
        "username": username,
        "password": password,
        "fullname": fullname
    }
    console.log(groupId);
    if (username.length > 0 && password.length > 0 && fullname.length > 0 && groupId != null) {
        $.ajax({
            url: '/_api/v1/account/register',
            type: "POST",
            data: register,
            success: function(response) {
                console.log(response.result);
                addtogroup(groupId, response.result.id, fullname);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                window.location.href = "patient.html?action=error";
            }
        });
    }
    else {
        window.location.href = "patient.html?action=error";
    }
});

function addtogroup(groupId, patientId, patientName) {
    var data = {
        "groupId": groupId,
        "patientId": patientId,
        "patientName": patientName
    }
    console.log(data);
    $.ajax({
        url: '/_api/v1/group/addtogroup',
        type: "POST",
        data: data,
        success: function(response) {
            console.log(response);
            window.location.href = "groupdetail.html?id="+groupId;
        },
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.href = "patient.html?action=error";
        }
    });
}

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
                    contentTable += '<option value="'+result[i]._id+'">'+result[i].name+'</option>';
                }
                console.log(contentTable);
                $('#select-group').html(contentTable);
            }
            $()
        },
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.href = "index.html?action=error";
        }
    });
}