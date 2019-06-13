$(document).ready(() => {
    var token = localStorage.getItem('token');
    var fullname = localStorage.getItem('fullname');
    var avatar = localStorage.getItem('avatar');
    if (token == null) {
        if (!window.location.pathname.includes("login") && !window.location.pathname.includes("register")) {
            window.location.href = "/login";
        };
    }

    $('.authAvt').attr('src', avatar);
    $('.authName').text(fullname);

    $('#logout').click(() => {
        localStorage.removeItem('fullname');
        localStorage.removeItem('id');
        localStorage.removeItem('token');
        localStorage.removeItem('avatar');
        window.location.href = "/login";
    });


    $('#login').click(() => {
        var username = $('#username').val();
        var password = $('#password').val();
        if (username.length == 0) {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Username is empty!'
            });
        } else if (password.length == 0) {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Password is empty!'
            });
        }
        var login = {
            "username": username,
            "password": password
        }
        if (username.length > 0 && password.length > 0) {
            $.ajax({
                url: '/_api/v1/account/login',
                type: "POST",
                data: login,
                success: function(response) {
                    localStorage.setItem('fullname', response.result.fullname);
                    localStorage.setItem('id', response.result.id);
                    localStorage.setItem('token', response.result.token);
                    localStorage.setItem('avatar', response.result.avatar);
                    window.location.href = "dashboard.html";
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: jqXHR.responseJSON.message
                    });
                }
            });
        }
    });

    $('#register').click(() => {
        var username = $('#username').val();
        var password = $('#password').val();
        var fullname = $('#fullname').val();
        if (username.length == 0) {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Username is empty!'
            });
        } else if (password.length == 0) {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Password is empty!'
            });
        } else if (fullname.length == 0) {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'FullName is empty!'
            });
        };
        var register = {
            "username": username,
            "password": password,
            "fullname": fullname
        }
        if (username.length > 0 && password.length > 0 && fullname.length > 0) {
            $.ajax({
                url: '/_api/v1/account/register',
                type: "POST",
                data: register,
                success: function(response) {
                    Swal.fire({
                        type: 'success',
                        title: 'Success',
                        text: 'Register success! Please login to continue...'
                    });
                    window.location.href = "/login";
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: jqXHR.responseJSON.message
                    });
                }
            });
        }
    });
});