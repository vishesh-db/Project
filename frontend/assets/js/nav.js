let user_btn = $("#profile");
let user = localStorage.getItem("loggedInUser");

if(user){
    user=JSON.parse(user)
    user_btn.text("Hello, "+user.name);
    $("#logout").text("Logout");
    $("#logout").click(()=>{
        if(user.isAdmin==false)
        {
          const cart_id = JSON.parse(localStorage.getItem("cart_id"));
            if(localStorage.getItem("myMap")!=null)
            {
            const map = new Map(JSON.parse(localStorage.myMap));
            const items = [];
       
           
            map.forEach((values,keys)=>{
              
                 items.push(JSON.stringify(values));
                 //console.log(items);
             });
             const cartObj={
                user_id:user._id,
                res_id:cart_id.id,
                 items:items,
             }
             $.ajax({
              type: "post",
              url: url+":80/addCart",
              contentType: "application/json",
              data: JSON.stringify(cartObj),
              xhrFields: { withCredentials: false },
              headers: {},
              success: function (data) {},
              error: function (xhr, ajaxOptions, thrownError) {
                alert("not able to fetch menu");
              },
            });
      
            localStorage.removeItem("myMap");
           }
          }
      
     localStorage.removeItem("loggedInUser");
    window.location.reload();
  });
  $("#login").hide();
  // $("#navbar").after("<b>Hello Geeks</b>");
}
else {
  user_btn.hide();
  $("#login").text("Sign In");
  $("#login").click(() => {
    window.location.href = "signin.html";
  });
  $("#logout").click(() => {
    window.location.href = "signup.html";
  });
}

