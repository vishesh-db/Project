$.get(url+":3000/menu/starter", function (data, status) {
  $(document).ready(function () {
    $("#menutable").DataTable({
      data: data,
      columns: [
        { data: "name", title: "Name" },
        { data: "cost", title: "Cost" },
      ],
    });
  });
});
$("#form").click(function (e) {
  // e.preventDefault();
  let name = $("#field1").val();
  let option = $("#field2").val();
  let img = $("#field3").prop('files')[0];
  // let img = document.getElementById("field3").files[0];
  console.log(img);
  let cost = $("#field4").val();
  if (name == "") {
    alert("Please enter your  Item name");

    return;
  }
  if (img == "") {
    alert("Please place img url");
    return;
  }
  if (cost == "") {
    alert("Please enter the cost");
    return;
  }

  if (option == 1) {
    const item = {
      name: name,
      img: img,
      cost: cost,
    };
    let imgarr=[]
    for(let i=0; i<img.length; i++) {
      imgarr.push(img[i]);
    }
    let fd = new FormData();
    fd.append("name", name);
    fd.append("img", img);
    fd.append("cost", cost);
    console.log(fd);
    $.ajax({
      type: "post",
      url: url+":3000/menu/addStarter",
      processData: false, // tell jQuery not to process the data
      contentType: false,
      data: fd,
      xhrFields: { withCredentials: false },
      headers: {},
      success: function (data) {
        console.log(data);
      },
      error: function (xhr, ajaxOptions, thrownError) {
        console.log(thrownError);
      },
    });
  } else if (option == 2) {
  } else if (option == 3) {
  } else {
  }
  alert("Item added Successfully");
});
