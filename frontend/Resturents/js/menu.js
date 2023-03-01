const res = JSON.parse(localStorage.getItem("loggedInRestaurant"));
const res_id = {
  id: res.id,
};

$("#form").click(async function (e) {
  e.preventDefault();
  let name = $("#field1").val();

  let option = $("#field2").val();

  let image = $("#img").prop("files")[0];
  // let img = document.getElementById("field3").files[0];
  let price = $("#field4").val();
  if (name == "") {
    alert("Please enter your  Item name");

    return;
  }
  if (image == "") {
    alert("Please place img url");
    return;
  }
  if (price == "") {
    alert("Please enter the price");
    return;
  }

  let imageFormData = new FormData();
  imageFormData.append("img", image);
  let imageres = await fetch(url+":80/upload", {
    method: "POST",
    body: imageFormData,
  });
  let imagepath = await imageres.json();
  let itemObj;
  if (option == 1) {
    itemObj = {
      res_id: res.id,
      category: "Veg",

      id: res.menuCount + 1,
      img: imagepath.location,

      name: name,
      price: price,
      quantity: 10,
      sellCount: 5,
    };
  } else {
    itemObj = {
      res_id: res.id,
      category: "Non-Veg",
      id: res.menuCount + 1,
      img: imagepath.location,

      name: name,
      price: price,
      quantity: 10,
      sellCount: 5,
    };
  }
  //  alert("vvv"+JSON.stringify(itemObj));

  $.ajax({
    type: "post",
    url: url+":80/restaurants/addItem",
    contentType: "application/json",
    data: JSON.stringify(itemObj),
    xhrFields: { withCredentials: false },
    headers: {},
    success: function (data) {
      console.log("Called");
      // localStorage.setItem("loggedInRestaurant", data);
      alert(" Item added successfully");
      //window.location.href = "index.html";
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr.responseText);
    },
  });
});

$.ajax({
  type: "post",
  url: url+":80/menus/getMenu",
  contentType: "application/json",
  data: JSON.stringify(res_id),
  xhrFields: { withCredentials: false },
  headers: {},
  success: function (data) {
    $(document).ready(function () {
      $("#visutable").DataTable({
        data: data,
        columns: [
          // { data: "_id", title: "#id" },
          { data: "id", title: "Id" },
          { data: "name", title: "Name" },
          { data: "category", title: "Category" },
          { data: "price", title: "Price" },
        ],
      });
    });
  },
  error: function (xhr, ajaxOptions, thrownError) {
    alert("not able to fetch menu");
  },
});
