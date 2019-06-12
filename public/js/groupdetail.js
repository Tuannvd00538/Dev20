var userid = localStorage.getItem('id');

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

var groupid = getUrlParameter('id');
console.log(groupid);
detailGroup(groupid)
if (id_group != null) {}


function detailGroup(groupid) {
    $.ajax({
        url: '/_api/v1/group/detail/'+groupid,
        type: "GET",
        success: function(response) {
            var result = response.result;
            if(result != null){
                var data = result[0].list;
                if(data != null) {
                    var contentTable = '';
                    for(var i = 0; i < data.length; i++) {
                        contentTable += '<tr>';
                        contentTable += '<td>'+data[i]._id+'</td>';
                        contentTable += '<td>'+data[i].name+'</td>';
                        contentTable += '<td class="text-right"><a href="index.html?id='+data[i]._id+'" class="btn btn-primary mr-2">Detail</a><button type="button" class="btn btn-danger">Delete</a></td>';
                        contentTable += '</tr>';
                    }
                    $('.table-patient').html(contentTable);
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // window.location.href = "index.html?action=error";
        }
    });
}
