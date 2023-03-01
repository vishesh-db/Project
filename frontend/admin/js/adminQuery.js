$.get(url+"/getQueries", function (data, status) {
  console.log(data);

  $(document).ready(function () {
    $("#queryTable").DataTable({
      data: data,
      columns: [
        { data: "name", title: "Name" },

        { data: "email", title: "Email" },
        { data: "subject", title: "Subject" },
        { data: "message", title: "Message" },
      ],
    });
  });
});
