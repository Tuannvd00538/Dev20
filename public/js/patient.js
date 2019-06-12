
var ownerid = localStorage.getItem('id');
listGroup(ownerid);


$('#button-create').click(() => {
    var username = $('#username').val();
    var password = $('#password').val();
    var fullname = $('#fullname').val();
    if (username.length == 0) {
        
    } else if (password.length == 0) {
        
    } else if (fullname.length == 0) {
        
    };
    var register = {
        "username": username,
        "password": password,
        "fullname": fullname
    }
    console.log(register);
    if (username.length > 0 && password.length > 0 && fullname.length > 0) {
        $.ajax({
            url: '/_api/v1/account/register',
            type: "POST",
            data: register,
            success: function(response) {
                window.location.href = "patient.html?action=success";
            },
            error: function(jqXHR, textStatus, errorThrown) {
                window.location.href = "patient.html?action=error";
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
            if(result != null){
                var contentTable = '';
                for(var i = 0; i < result.length; i++) {
                    contentTable += '<optoin value="'+result[i]._id+'">'+result[i].name+'</option>';
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