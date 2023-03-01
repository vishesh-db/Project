// $(document).ready(function(){
//     $("#placeSubmitBtn").click(function(){
//         console.log("placeSubmitBtn clicked");
//         placeName = $("#placeName").val();
//         placeUrl = $("#placeUrl").val();
//         pName = $("#pName").val();
//         img1 = $("#img1").val();
//         img2 = $("#img2").val();
//         discription = $("#discription").val();
//         var obj = {
//             name : placeName,
//             imgUrl : placeUrl,
//             pName : pName,
//             img1 : img1,
//             img2 : img2,
//             discription : discription
//         }
//         console.log(obj);
//         $.ajax({
//             'method' : 'PUT',
//             contentType : 'application/json',
//             'data' : JSON.stringify(obj),
//             'url' : 'http://localhost:3000/api/places',
//             "success" : (e) => {alert("Updating a place is Successfully done");},
//             error : (e) => {
//                 alert("Error while updating place","bg-danger");
//             }

//         });
//     });
// });

// $("#chefSubmitBtn").click(function(){
//     let name=$("#chefName").val();
//     let password=$("#chefPassword").val();
//     let email=$("#chefMail").val();
//     let isChef=false;
// })