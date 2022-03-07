function displayDailyChart() {
    var dailyBox = document.getElementById("bkk-daily-box");
    var hoursBox = document.getElementById("bkk-hours-box");
    dailyBox.style.display = "block";
    hoursBox.style.display = "none";
    
}  

function displayHoursChart() {
    var dailyBox = document.getElementById("bkk-daily-box");
    var hoursBox = document.getElementById("bkk-hours-box");
    hoursBox.style.display = "block";
    dailyBox.style.display = "none";
}  


$(document).ready(function () {
    const url = "https://api.nostramap.com/Service/V2/GeoLocation/GetWeather";
    const API_KEY = "G)v9t16rRvfvrlHYVYWZTdMRAaxGZjd3J)0wOApdFcYOuBzWCuNZ0V3iuH49uPm9sC5LIBRyGL7nep3k0nMfA7G=====2";

    $.ajax({ 
        url: url, 
        contentType: "application/json", 
        type: 'GET', 
        dataType: 'jsonp',
        jsonp: 'callback',
        async: false,
        data: {
            key: API_KEY,
            lat: 13.78,
            lon: 100.57,
            frequency: "daily",
            interval: 7,
            format: "json"
        },
        beforeSend: function() {
            $('.spinner-border').show();
        },
        success: function(results) {
            $('.spinner-border').hide();
            // console.log(results['results']['weather']);
            createDailyBKKChart(results)
            
            // console.log(response);
        }, 
    });


    function createDailyBKKChart (results) {
        console.log(results['results']['weather']);

        let weatherItems = [];
        let weatherIcons = [];
        let weatherDates = [];

        for (var i = 0; i < 7; i++ ) {
            weatherItems.push(results['results']['weather'][i]['temperature']['temp']);
            weatherIcons.push(results['results']['weather'][i]['icon']);
            weatherDates.push(results['results']['weather'][i]['timeStamp'].slice(0,10));
        }

        

        console.log(weatherDates);

        var xValues = weatherDates;
        var yValues = weatherItems;
        var icons = weatherIcons;

        var barColors = ["#304D63", "#B2E7E8","#8FB9AA","#F2D096","#ED8975", "#FFE74C", "#7F58AF"];
    
        new Chart("bkk-daily-chart", {
            type: "bar",
            plugins: [{
                afterDraw: chart => {      
                var ctx = chart.chart.ctx; 
                var xAxis = chart.scales['x-axis-0'];
                var yAxis = chart.scales['y-axis-0'];
                xAxis.ticks.forEach((value, index) => {  
                    var x = xAxis.getPixelForTick(index);      
                    var image = new Image();
                    image.src = icons[index],
                    ctx.drawImage(image, x + 20, yAxis.bottom+20);
                });      
                }
            }],
            data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    data: yValues
                }]
            },
            options: {
                responsive: true,
                layout: {
                    padding: {
                      bottom: 50
                    }
                },
                legend: {display: false},
                title: {
                    display: false,
                },
                
                scales: {
                    xAxes: [{
                        ticks: {
                            padding: 30
                        },
                        gridLines: {
                            display : false
                        },
                    }],
                    yAxes: [{
                        gridLines: {
                            display : false
                        }
                    }],
                }
            },

        });

    };


    $.ajax({ 
        url: url, 
        contentType: "application/json", 
        type: 'GET', 
        dataType: 'jsonp',
        jsonp: 'callback',
        async: false,
        data: {
            key: API_KEY,
            lat: 13.78,
            lon: 100.57,
            frequency: "3Hours",
            interval: 8,
            format: "json"
        },
        beforeSend: function() {
            $('.spinner-border').show();
        },
        success: function(results) {
            $('.spinner-border').hide();
            // console.log(results['results']['weather']);
            createHoursBKKChart(results)
            
            // console.log(response);
        }, 
    });


    function createHoursBKKChart (results) {
        // console.log(results['results']['weather']);

        let weatherItems = [];
        let weatherIcons = [];
        let weatherDates = [];

        for (var i = 0; i < 8; i++ ) {
            weatherItems.push(results['results']['weather'][i]['temperature']['temp']);
            weatherIcons.push(results['results']['weather'][i]['icon']);
            weatherDates.push(results['results']['weather'][i]['timeStamp'].slice(0,10));
        }

        

        console.log(weatherDates);

        var xValues = weatherDates;
        var yValues = weatherItems;
        var icons = weatherIcons;

        var barColors = ["#304D63", "#B2E7E8","#8FB9AA","#F2D096","#ED8975", "#FFE74C", "#7F58AF"];
    
        new Chart("bkk-hours-chart", {
            type: "bar",
            plugins: [{
                afterDraw: chart => {      
                var ctx = chart.chart.ctx; 
                var xAxis = chart.scales['x-axis-0'];
                var yAxis = chart.scales['y-axis-0'];
                xAxis.ticks.forEach((value, index) => {  
                    var x = xAxis.getPixelForTick(index);      
                    var image = new Image();
                    image.src = icons[index],
                    ctx.drawImage(image, x + 20, yAxis.bottom+20);
                });      
                }
            }],
            data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    data: yValues
                }]
            },
            options: {
                responsive: true,
                layout: {
                    padding: {
                      bottom: 50
                    }
                },
                legend: {display: false},
                title: {
                    display: false,
                },
                
                scales: {
                    xAxes: [{
                        ticks: {
                            padding: 30
                        },
                        gridLines: {
                            display : false
                        },
                    }],
                    yAxes: [{
                        gridLines: {
                            display : false
                        }
                    }],
                }
            },

        });

    };


    


 




});