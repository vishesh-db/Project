$.get(url+"/getUsers", function (data, status) {
  console.log(data);

  $(document).ready(function () {
    $("#visutable").DataTable({
      data: data,
      columns: [
        // { data: "_id", title: "#id" },
        { data: "name", title: "Name" },

        { data: "email", title: "Email" },
      ],
    });
  });
});
