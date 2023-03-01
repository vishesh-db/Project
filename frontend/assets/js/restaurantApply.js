$("document").ready(function () {
  $(".step2").hide();
  $(".step1").show();
  // $(".step1").hide();
});

$("#next").click(function () {
  $(".step1").hide();
  $(".step2").show();
});

$("#previous").click(function () {
  $(".step2").hide();
  $(".step1").show();
});

let register = $("#register");
// console.log(register);

register.click(async function () {
  let name = $("#name").val();
  let email = $("#email").val();
  let password = $("#password").val();
  let password_repeat = $("#password-repeat").val();
  let street = $("#street").val();
  let locality = $("#locality").val();
  let city = $("#city").val();
  let pincode = $("#pincode").val();
  let fssai = $("#fssai").prop("files")[0];
  let image = $("#img").prop("files")[0];
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
  let fssaiFormData = new FormData();
  let imageFormData = new FormData();
  fssaiFormData.append("img", fssai);
  imageFormData.append("img", image);
  let [fssaires, imageres] = await Promise.all([
    fetch(url+":3000/upload", {
      method: "POST",
      body: fssaiFormData,
    }),
    fetch(url+":3000/upload", {
      method: "POST",
      body: imageFormData,
    }),
  ]);
  let fssaipath = await fssaires.json();
  let imagepath = await imageres.json();

  let currest = {
    name: name,
    email: email,
    password: password,
    address: {
      street: street,
      locality: locality,
      city: city,
      pincode: pincode,
    },
    fssaiCertificate: fssaipath.location,
    image: imagepath.location,
  };
  //   curuser = JSON.stringify(curuser);
  //   $.post(
  //     url+":3000/signup",
  //     curuser,
  //     function (xhr, status, responseText) {
  //       console.log("data", responseText);
  //       console.log("success", status);
  //     }
  //   );
  $.ajax({
    type: "post",
    url: url+":3000/restaurants/apply",
    contentType: "application/json",
    data: JSON.stringify(currest),
    xhrFields: { withCredentials: false },
    headers: {},
    success: function (data) {
      console.log("Success");
      // console.log(data);
      data = JSON.stringify(data);
      localStorage.setItem("loggedInUser", data);
      alert("Registration successful");
      window.location.href = "index.html";
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr.responseText);
    },
  });
});
