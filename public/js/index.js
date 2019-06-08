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


    // var socket = io("https://devhaichuc.herokuapp.com");

    // socket.on("PushTempratureToClient", function (temperature) {
    //     console.log(`Nhiệt độ: ${temperature}`); 
    // });

    // getWarningToday(id);
    // getMe(id);
    // getWarningYear(id, year);
    // getWarningMonth(id, month, year);
    // warningToday();
    chartRealtime();
    getWarningRealtimeToday(id)

    if (token == null) {
        if (!window.location.pathname.includes("login") && !window.location.pathname.includes("register")) {
            window.location.href = "/login";
        };
    }

});

function getMe(id) {
    $.ajax({
        url: '/_api/v1/account/' + id,
        type: "GET",
        success: function (response) {
            console.log(response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("error");
        }
    });
}

function postWarning(id, temperature) {
    var data = {
        "ownerId": id,
        "temperature": temperature,
        "isWarning": true
    };
    $.ajax({
        url: '/_api/v1/warning',
        type: "POST",
        data: data,
        success: function (response) {
            console.log(response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("error");
        }
    });
}

function getWarningToday(id) {
    
    var data = [];
    $.ajax({
        url: '/_api/v1/warning/' + id,
        type: "GET",
        data: data,
        success: function (response) {
            console.log(response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("error");
        }
    });
}

function getWarningRealtimeToday(id) {
    
    var data = [];
    $.ajax({
        url: '/_api/v1/realtime/' + id + '/today',
        type: "GET",
        data: data,
        success: function (response) {
            console.log(response);
            var data = response.result; 
            var time = new Array();
            var temperatureToday = new Array();
            for(let i = 0; i < data.length; i++) {
                let timeTodayCurrent = new Date(data[i].createdAt);
                var timeCurrentFormat = '';
                if(i == 0){
                    timeCurrentFormat = timeTodayCurrent.getHours()+":"+timeTodayCurrent.getMinutes()+":"+timeTodayCurrent.getSeconds();
                }
                else {
                    timeCurrentFormat = timeTodayCurrent.getMinutes()+":"+timeTodayCurrent.getSeconds();
                }
                
                time.push(timeCurrentFormat);
                temperatureToday.push(parseFloat(data[i].temprature));
            }
            console.log(time);
            console.log(temperatureToday);
            chartLineWarningToday(time, temperatureToday);
            chartAreaWarningToday(time, temperatureToday);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("error");
        }
    });
}

function chartLineWarningToday(time, data) {
    try {
        //Sales chart
        var ctx = document.getElementById("sales-chart");
        if (ctx) {
          ctx.height = 150;
          var myChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: time,
              type: 'line',
              defaultFontFamily: 'Poppins',
              datasets: [{
                label: "Temperature",
                data: data,
                backgroundColor: 'transparent',
                borderColor: 'rgba(220,53,69,0.75)',
                borderWidth: 3,
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: 'rgba(220,53,69,0.75)',
              }]
            },
            options: {
              responsive: true,
              tooltips: {
                mode: 'index',
                titleFontSize: 12,
                titleFontColor: '#000',
                bodyFontColor: '#000',
                backgroundColor: '#fff',
                titleFontFamily: 'Poppins',
                bodyFontFamily: 'Poppins',
                cornerRadius: 3,
                intersect: false,
              },
              legend: {
                display: false,
                labels: {
                  usePointStyle: true,
                  fontFamily: 'Poppins',
                },
              },
              scales: {
                xAxes: [{
                  display: true,
                  gridLines: {
                    display: false,
                    drawBorder: false
                  },
                  scaleLabel: {
                    display: false,
                    labelString: 'Month'
                  },
                  ticks: {
                    fontFamily: "Poppins"
                  }
                }],
                yAxes: [{
                  display: true,
                  gridLines: {
                    display: false,
                    drawBorder: false
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'Value',
                    fontFamily: "Poppins"
    
                  },
                  ticks: {
                    fontFamily: "Poppins"
                  }
                }]
              },
              title: {
                display: false,
                text: 'Normal Legend'
              }
            }
          });
        }
    
    
      } catch (error) {
        console.log(error);
      }
}

function chartAreaWarningToday(time, data) {
    try {

        //Team chart
        var ctx = document.getElementById("team-chart");
        if (ctx) {
          ctx.height = 150;
          var myChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: time,
              type: 'line',
              defaultFontFamily: 'Poppins',
              datasets: [{
                data: data,
                label: "Expense",
                backgroundColor: 'rgba(0,103,255,.15)',
                borderColor: 'rgba(0,103,255,0.5)',
                borderWidth: 3.5,
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: 'rgba(0,103,255,0.5)',
              },]
            },
            options: {
              responsive: true,
              tooltips: {
                mode: 'index',
                titleFontSize: 12,
                titleFontColor: '#000',
                bodyFontColor: '#000',
                backgroundColor: '#fff',
                titleFontFamily: 'Poppins',
                bodyFontFamily: 'Poppins',
                cornerRadius: 3,
                intersect: false,
              },
              legend: {
                display: false,
                position: 'top',
                labels: {
                  usePointStyle: true,
                  fontFamily: 'Poppins',
                },
    
    
              },
              scales: {
                xAxes: [{
                  display: true,
                  gridLines: {
                    display: false,
                    drawBorder: false
                  },
                  scaleLabel: {
                    display: false,
                    labelString: 'Month'
                  },
                  ticks: {
                    fontFamily: "Poppins"
                  }
                }],
                yAxes: [{
                  display: true,
                  gridLines: {
                    display: false,
                    drawBorder: false
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'Value',
                    fontFamily: "Poppins"
                  },
                  ticks: {
                    fontFamily: "Poppins"
                  }
                }]
              },
              title: {
                display: false,
              }
            }
          });
        }
    
    
      } catch (error) {
        console.log(error);
      }
}

function chartRealtime() {
    var lastDate = 0;
        var data = [];
        var TICKINTERVAL = 1000;
        let XAXISRANGE = 1000*60;
        var RANGESLIDE = 70;
        var maxy = 40;
        var miny = 30;

        var socket = io("https://devhaichuc.herokuapp.com");
        var temperatureCurent = miny;
            
        socket.on("PushTempratureToClient", function (temperature) {
            // console.log(temperature); 
            temperatureCurent = temperature
        });
        
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
        
        console.log(Date.now());
        getDayWiseTimeSeries(Date.now(), RANGESLIDE, {
            min: 10,
            max: 90
        })

        function getNewSeries(baseval, yrange) {
            var newDate = baseval + TICKINTERVAL;
            lastDate = newDate

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
                        return dateCurrent.getHours()+":"+dateCurrent.getMinutes()+":"+dateCurrent.getSeconds();
                    }, 
                  }
            },
            yaxis: {
                max: maxy,
                min: miny
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
        }, 1000)
}
