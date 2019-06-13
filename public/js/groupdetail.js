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

if (groupid != null) {
    detailGroup(groupid);
    var listPatient = localStorage.getItem('listPatient');
    listPatient = listPatient.split(",");
    console.log();

    var listPatientJson = {
        '5d01c4704e4ebf2fd859b8ad' : 3,
        '5d01c4704e4ebf2fd859b8ad' : 2,
    };
    var id = localStorage.getItem('id');
    var lastDate = 0;
    var data = [];
    var TICKINTERVAL = 1000;
    var XAXISRANGE = TICKINTERVAL * 60;
    var RANGESLIDE = 70;
    var maxy = 40;
    var miny = 30;
    var socketOn = false;
    var socket = io(`https://devhaichuc.herokuapp.com/`);
    var temperatureCurent = miny;
    var downPerTime = 0.2;
    var timeDownChartDefault = 3;
    var timeDownChart = 0;
    var accountChart = "0";

    socket.on("PushTempratureToClient", (temperature, ownerId, isWarning) => {
        console.log(temperature);
        localStorage.setItem(ownerId, 3);
        $('#'+ownerId).find('.temperature').text(temperature);
        if(isWarning == true) {
            $('#'+ownerId).attr('class', 'overview-item overview-item--c3 overview-box clearfix ');
        }
        else {
            $('#'+ownerId).attr('class', 'overview-item overview-item--c2 overview-box clearfix ');
        }

        if (ownerId == accountChart) {
            socketOn = true;
            timeDownChart = timeDownChartDefault;
            temperatureCurent = temperature;
        }
    });

    chartRealtime();

    setInterval(function() {
        for(var i = 0; i < listPatient.length; i++){
            var temperatureCurrent = Math.round($('#'+listPatient[i]).find('.temperature').text());
            var timesCurrent = localStorage.getItem(listPatient[i]);
            if (timesCurrent != 0) {
                localStorage.setItem(listPatient[i], timesCurrent-1);
            }
            else if(temperatureCurrent > 2) {
                $('#'+listPatient[i]).attr('class', 'overview-item overview-item--c2 overview-box clearfix ');
                $('#'+listPatient[i]).find('.temperature').text(temperatureCurrent -= 2);
            } else {
                $('#'+listPatient[i]).find('.temperature').text(0);
            }       
        }
    }, 1000);

}
else{
    window.location.href = "dashboard.html";
}

$(document).on('click', '.delete-owner', function () {
    var rowthis = $(this).parents("tr");
    var ownerId = $(this).find('span').text();
    if(confirm("Are you sure you want to delete the owner ?")) {
        $.ajax({
            url: '/_api/v1/group/remove/'+groupid+'/'+ownerId,
            type: "POST",
            success: function(response) {
                console.log(response);
                rowthis.attr('class', 'd-none');
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Delete error');
            }
        });
    }
});


function detailGroup(groupid) {
    var listPatient = new Array();
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
                        listPatient.push(data[i].patientId);
                        localStorage.setItem(data[i].patientId, 0);
                        contentTable += '<div class="col-md-4 col-sm-6 col-xs-12">';
                            contentTable += '<div class="overview-item overview-item--c2 overview-box clearfix cursor-pointer" id="'+data[i].patientId+'">';
                                contentTable += '<div class="text-center">';
                                    contentTable += '<h2 class="col-fff temperature">0</h2>';
                                contentTable += '</div>';
                                contentTable += '<div class="icon d-block">';
                                    contentTable += '<i class="zmdi zmdi-account-o mr-3"></i>';
                                    contentTable += '<span class="col-fff">'+data[i].patientName+'</span>';
                                contentTable += '</div>';
                                contentTable += '<div class="icon d-block">';
                                    contentTable += '<i class="fas fa-thermometer-half mr-3"></i>';
                                    contentTable += '<span class="col-fff">Default</span>';
                                contentTable += '</div>';
                            contentTable += '</div>';
                        contentTable += '</div>';;
                    }
                    localStorage.setItem('listPatient', listPatient);
                    $('.list-patient').html(contentTable);
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // window.location.href = "index.html?action=error";
        }
    });
}

$(document).on('click', '.overview-item', function() {
    var accountId = $(this).attr('id');
    accountChart = accountId;
    $('#modalRealtime').modal();
});

function chartRealtime() {
    function getDayWiseTimeSeries(baseval, count, yrange) {
      var i = 0;
      while (i < count) {
        var x = baseval;
        var y = miny;
  
        data.push({
          x, y
        });
        lastDate = baseval
        baseval += TICKINTERVAL;
        i++;
      }
    }
  
    getDayWiseTimeSeries(Date.now() - 1000 * RANGESLIDE, RANGESLIDE, {
      min: 10,
      max: 90
    })
  
    function getNewSeries(baseval, yrange) {
      var newDate = baseval + TICKINTERVAL;
      lastDate = newDate;
  
      if (!socketOn) {
        timeDownChart--;
      }
  
      if (timeDownChart <= 0) {
        temperatureCurent -= downPerTime;
      }
  
      if (temperatureCurent < miny) {
        temperatureCurent = miny;
      }
  
      if (temperatureCurent > maxy) {
        temperatureCurent = maxy;
      }
  
      for (var i = 0; i < data.length - RANGESLIDE; i++) {
        data[i].x = newDate - XAXISRANGE - TICKINTERVAL;
        data[i].y = miny;
      }
  
      data.push({
        x: newDate,
        y: temperatureCurent
      })
      socketOn = false
  
    }
  
    function resetData() {
      data = data.slice(data.length - RANGESLIDE, data.length);
    }
  
    var options = {
      chart: {
        height: 350,
        type: 'line',
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000
          }
        },
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      series: [{
        data: data
      }],
      title: {
        show: false
      },
      markers: {
        size: 0
      },
      xaxis: {
        type: 'datetime',
        range: XAXISRANGE,
        labels: {
          formatter: function (value, XAXISRANGE) {
            let dateCurrent = new Date(XAXISRANGE);
            return dateCurrent.getHours() + ":" + dateCurrent.getMinutes() + ":" + dateCurrent.getSeconds();
          },
        }
      },
      yaxis: {
        max: maxy,
        min: miny,
        labels: {
          formatter: function (value) {
            return value.toPrecision(3);
          }
        }
      },
      legend: {
        show: false
      },
    }
  
    var chart = new ApexCharts(
      document.querySelector("#chart"),
      options
    );
  
    chart.render();
  
    window.setInterval(function () {
      getNewSeries(lastDate, {
        min: 10,
        max: 90
      })
      chart.updateSeries([{
        data: data
      }])
    }, TICKINTERVAL)
}
