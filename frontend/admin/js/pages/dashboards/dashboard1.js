let obj={
  id:1
}
 $.ajax({
  type: "POST",
  url: url+"/analytics/charts",
  contentType: "application/json",
  data: JSON.stringify(obj),
  xhrFields: { withCredentials: false },
  headers: {},
  success: function (data) {
    console.log(data);
    let orderCounts=[]
    let dates=[]
    for(doc of data) {
      orderCounts.push(doc.count);
      dates.push(doc._id.day+"/"+doc._id.month);
    }
    orderCounts.reverse()
    dates.reverse()
    let options = {
      series: [
        {
          name: "Orders",
          data: orderCounts,
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
