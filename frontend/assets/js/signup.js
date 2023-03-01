let register = $("#register");

// function ValidateEmail(mail) {
//   if (
//     /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.emailAddr.value)
//   ) {
//     return true;
//   }
//   alert("You have entered an invalid email address!");
//   return false;
// }
register.click(function () {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let password_repeat = document.getElementById("password-repeat").value;
  if (name == "") {
    alert("Please enter your name");

    return;
  }
  if (email == "") {
    alert("Please enter your email");
    return;
  }
  if (password == "") {
    alert("Please enter your password");
    return;
  }
  if (password_repeat == "") {
    alert("Please repeat your password");
    return;
  }
  if (password != password_repeat) {
    alert("Passwords do not match");
    return;
  }
  // let ind=-1;
  
  let curuser = {
    name: name,
    email: email,
    password: password,
    isAdmin: false,
    
    
  };
  // curuser = JSON.stringify(curuser);
  // $.post(
  //   url+"/signup",
  //   curuser,
  //   function (xhr, status, responseText) {
  //     console.log("data", responseText);
  //     console.log("success", status);
  //   }
  // );
  $.ajax({
    type: "post",
    url: url+"/signup",
    contentType: "application/json",
    data: JSON.stringify(curuser),
    xhrFields: { withCredentials: false },
    headers: {},
    success: function (data) {
      console.log("Success");
      // console.log(data);
      data = JSON.stringify(data);
      localStorage.setItem("loggedInUser", data);
      alert("Registration successful");
      window.location.href = "signin.html";
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr.responseText);
    },
  });
});
