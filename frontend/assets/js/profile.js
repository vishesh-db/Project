let user = localStorage.getItem("loggedInUser");
user = JSON.parse(user);
$("#name1").attr("placeholder", user.name);
$("#email").attr("placeholder", user.email);
// $("#name1").attr('placeholder',user.name);

$.ajax({
  type: "post",
  url: url+":80/analytics/userOrderHistory",
  contentType: "application/json",
  data: JSON.stringify({
    id: user._id,
  }),
  xhrFields: { withCredentials: false },
  headers: {},
  success: function (data) {
    data = JSON.parse(data);
    console.log(data);
    for (order of data.orderData) {
      let restName = "";
      for (let i = 0; i < data.restaurantData.length; i++) {
        if (order.restaurant_id == data.restaurantData[i].id) {
          restName = data.restaurantData[i].name;
          break;
        }
      }
      let itemString = "";
      for (let i = 0; i < Math.min(2, order.items.length); i++) {
        itemString += `<li class="list-group-item">${order.items[i].item} * ${order.items[i].quantity}</li>`;
      }
      let size = order.items.length - 2;
      if (size === -1) {
        itemString += `<li class="list-group-item"> <br></li>`;
        itemString += `<li class="list-group-item"><br> </li>`;
      } else if (size === 0) {
        itemString += `<li class="list-group-item"><br> </li>`;
      }
      if (order.items.length > 2) {
        itemString += `<li class="list-group-item">+ ${order.items.length} more</li>`;
      }
      console.log(itemString);
      $("#orderHistory").append(`<div class="card col-2 m-3" style="">
       <div class="card-body">
       <div class="row">
       <div class="col">
       <div class="row justify-content-between">
       <div class="col">
       <h5 class="card-title">${restName}</h5>
       <h6 class="card-subtitle mb-3 text-muted">Order No-${order.orderId}</h6>
       </div>
       <div class="col">
       </div>
       </div>
       </div>
       <div class="col">
       <span class=""> ${order.status} </span>
       </div>
       </div>
       <ul class="list-group list-group-flush mb-3">
       ${itemString}
     </ul>
     <a href="#" class="card-link">Reorder</a>
     <a href="#" class="card-link">Rate</a>
     </div>
     </div>`);
    }
  },
  error: function (xhr, ajaxOptions, thrownError) {
    alert(xhr.responseText);
  },
});
