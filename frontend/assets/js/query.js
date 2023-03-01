
$("#querySubmit").click(()=>{

    let name=$("#name1").val();
    let email=$("#mail").val();
    let subject=$("#subject").val();
    let message=$("#message").val();
    let queryObj={
        name: name,
        email: email,
        subject: subject,
        message: message
    }
    $.ajax({
        type: "post",
        url: url+":3000/addQueries",
        contentType: "application/json",
        data: JSON.stringify(queryObj),
        xhrFields: { withCredentials: false },
        headers: {},
        success: function (data) {
          console.log("Success");
          // console.log(data);
          alert("Thank You for Showing Interest!!We will get back to you Soon");
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert(xhr.responseText);
        },
      });

})