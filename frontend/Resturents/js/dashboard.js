var obj = {
  id: 1,
};

$.ajax({
  type: "POST",
  url: url+":3000/analytics/menuAnalysis",
  contentType: "application/json",
  data: JSON.stringify(obj),
  xhrFields: { withCredentials: false },
  headers: {},
  success: function (data) {
    $("#piechart").empty();
    data = JSON.parse(data);
    var options1 = {
      series: data.qty,
      chart: {
        width: 380,
        type: "donut",
      },
      labels: data.menu,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };

    var chart2 = new ApexCharts(document.querySelector("#piechart"), options1);
    chart2.render();
  },
  error: function (xhr, ajaxOptions, thrownError) {
    console.log(xhr.responseText);
  },
});

$.ajax({
  type: "POST",
  url: url+":3000/analytics/charts",
  contentType: "application/json",
  data: JSON.stringify(obj),
  xhrFields: { withCredentials: false },
  headers: {},
  success: function (data) {
    $("#chart").empty();
    let orderCounts = [];
    let dates = [];
    for (doc of data) {
      orderCounts.push(doc.count);
      dates.push(doc._id.day + "/" + doc._id.month);
    }
    orderCounts.reverse();
    dates.reverse();
    let options = {
      series: [
        {
          name: "Orders",
          data: orderCounts,
        },
      ],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        // text: "Product Trends by Month",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: dates,
      },
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  },
  error: function (xhr, ajaxOptions, thrownError) {
    console.log(xhr.responseText);
  },
});

$.ajax({
  type: "post",
  url: url+":3000/analytics/total",
  contentType: "application/json",
  data: JSON.stringify(obj),
  xhrFields: { withCredentials: false },
  headers: {},
  success: function (data) {
    $("#totalSum").html(data[0].sum);
    $("#avgOrder").html(Math.round(data[0].avg));
  },
  error: function (xhr, ajaxOptions, thrownError) {
    alert(xhr.responseText);
  },
});

$.ajax({
  type: "post",
  url: url+":3000/analytics/uniqueUsers",
  contentType: "application/json",
  data: JSON.stringify(obj),
  xhrFields: { withCredentials: false },
  headers: {},
  success: function (data) {
    $("#uniqueUsers").html(data.length);
  },
  error: function (xhr, ajaxOptions, thrownError) {
    console.log(xhr.responseText);
  },
});

$.ajax({
  type: "post",
  url: url+":3000/analytics/orderAnal",
  contentType: "application/json",
  data: JSON.stringify(obj),
  xhrFields: { withCredentials: false },
  headers: {},
  success: function (data) {
    data = JSON.parse(data);
    console.log(data);
    $("#pending").html(data.pending);
    $("#completed").html(data.completed);
    $("#rejected").html(data.rejected);
  },
  error: function (xhr, ajaxOptions, thrownError) {
    console.log(xhr.responseText);
  },
});
