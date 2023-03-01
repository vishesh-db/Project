let curuser = "user";

$("#customer").click(function () {
  $("#restaurant").removeClass("active");
  $("#customer").addClass("active");
  // $(".createNewRestaurant").hide();
  curuser = "user";
});
$("#restaurant").click(function () {
  $("#customer").removeClass("active");
  $("#restaurant").addClass("active");
  // $(".createNewUser").hide();
  curuser = "restaurant";
});

$("#login").click(() => {
  let curemail = document.getElementById("email").value;
  let pass = document.getElementById("pass").value;
  if (curemail == "") {
    alert("Please enter email");
    return;
  } else if (pass == "") {
    alert("Please enter password");
    return;
  }
  let obj = {
    email: curemail,
    password: pass,
  };
  if (curuser === "user") {
    $.ajax({
      type: "post",
      url: url+":3000/signin",
      contentType: "application/json",
      data: JSON.stringify(obj),
      xhrFields: { withCredentials: false },
      headers: {},
      success: function (data) {
        console.log("Success");
        localStorage.removeItem("loggedInRestaurant");
        localStorage.setItem("loggedInUser", data);
        data = JSON.parse(data);
        if (data.isAdmin) {
          window.location.href = "admin/dashboard.html";
        }
        localStorage.setItem("cart_id", JSON.stringify(data.cart.res_id));
        if (data.cart.res_id.id != -1) {
          const array = data.cart.items;
          const map = new Map();
          for (let i = 0; i < array.length; i++) {
            map.set(array[i].id, {
              id: array[i].id,
              name: array[i].name,
              qt: array[i].qt,
              price: array[i].price,
            });
          }
          localStorage.myMap = JSON.stringify(Array.from(map.entries()));
        }
        // alert("Login successful");
        console.log(data);
        if (data.isAdmin) {
          window.location.href = "admin/dashboard.html";
        } else {
          window.location.href = "index.html";
        }
      },
      error: function (xhr, ajaxOptions, thrownError) {
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("loggedInRestaurant");
        alert(xhr.responseText);
      },
    });
  } else {
    $.ajax({
      type: "post",
      url: url+":3000/restaurant/signin",
      contentType: "application/json",
      data: JSON.stringify(obj),
      xhrFields: { withCredentials: false },
      headers: {},
      success: function (data) {
        console.log("Success");
        localStorage.removeItem("loggedInUser");
        localStorage.setItem("loggedInRestaurant", data);
        data = JSON.parse(data);
        // alert("Login successful");
        console.log(data);
        window.location.href = "/Resturents/static/dashboard.html";
      },
      error: function (xhr, ajaxOptions, thrownError) {
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("loggedInRestaurant");
        alert(xhr.responseText);
      },
    });
  }
  // localStorage.setItem('loggedInUser', curIndex);
});
