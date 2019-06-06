$(document).ready(() => {

    var token = localStorage.getItem('token');
    var fullname = localStorage.getItem('fullname');
    var avatar = localStorage.getItem('avatar');
    var id = localStorage.getItem('id');
    console.log(id);
    var year = 2019;
    var month = 06;
    // setInterval(function() {
    //     var temperature = Math.floor((Math.random() * 5) + 36);
    //     postWarning(id, temperature);
    //     console.log(temperature);
    // }, 2000);
    
    getWarningToday(id);
    // getMe(id);
    // getWarningYear(id, year);
    // getWarningMonth(id, month, year);
    
    if (token == null) {
        if (!window.location.pathname.includes("login") && !window.location.pathname.includes("register")) {
            window.location.href = "/login";
        };
    }
    
});

function getMe(id) {
    $.ajax({
        url: '/_api/v1/account/'+id,
        type: "GET",
        success: function(response) {
            console.log(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("error");
        }
    });
}

function postWarning(id, temperature) {
    var data = {
        "ownerId" : id,
        "temperature" : temperature,
        "isWarning" : true
    };
    $.ajax({
        url: '/_api/v1/warning',
        type: "POST",
        data: data,
        success: function(response) {
            console.log(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("error");
        }
    });
}

function getWarningToday(id) {
    var data = [];
    $.ajax({
        url: '/_api/v1/warning/'+id+'/today',
        type: "GET",
        data: data,
        success: function(response) {
            console.log(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("error");
        }
    });
}

function getWarningYear(id, year) {
    var data = [];
    $.ajax({
        url: '/_api/v1/warning/'+id+'/'+year,
        type: "GET",
        data: data,
        success: function(response) {
            console.log(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("error");
        }
    });
}

function getWarningMonth(id, month, year) {
    var data = [];
    $.ajax({
        url: '/_api/v1/warning/'+id+'/'+month+'/'+year,
        type: "GET",
        data: data,
        success: function(response) {
            console.log(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("error");
        }
    });
}
