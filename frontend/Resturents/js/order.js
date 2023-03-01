$(document).ready(() => {
    $("#Ordersubmit").click(() => {
        var name = $("#cname").val();
        var email = $("#cemail").val();
        var query = $("#cquery").val();
    
        console.log("contact form submited");
        obj =   {
            name : name,
            email : email,
            query : query
        };
        console.log(obj)
        $.ajax({

            'method':'POST',contentType:'application/json',
            'data':JSON.stringify(obj),
            'url': 'http://localhost:3000/api/queries',
            "success":(e)=>{alert("success while postion query");},
            error:(e) => {alert("Error while postion query","bg-danger");}

        });
    })
})
