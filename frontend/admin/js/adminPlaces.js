window.onload=function(){
    console.log("admin query on loaded");
    $(document).ready(function () {
        $.get(url+":3000/api/places",function(obj, status){
        
            console.log(obj.data);
            var id= 1;
            $.each(obj.data, function(i){                                                                                                                                                                                                               
                var templateString = "<div class='place__card'><img src='"+obj.data[i].imgUrl+"' alt='' class='place__img'><div class='place__content'><div class='place__data'><h3 class='place__title'>"+obj.data[i].name+"</h3></div></div><a href='place.html#"+obj.data[i].name+"'class='button button--flex place__button'><i class='ri-arrow-right-line'></i></a></div>";
                $("#cardContainer").append(templateString);
                var onAdminPage = "<tr><td>"+(id)+"</td><td>"+obj.data[i].name+"</td><td>"+obj.data[i].imgUrl+"</td><tr>";
                $("#tableBody").append(onAdminPage);
                id++;
            });
    
        });
    });   
}




// window.onload=function(){
//     console.log("admin query on loaded")
//     var xhttp=new XMLHttpRequest();
//     xhttp.open("GET",url+":3000/api/places")
//     xhttp.send()
//     xhttp.onload=()=>{
//         var obj=JSON.parse(xhttp.responseText);
//         //document.getElementById("countOfQuiries").innerHTML=obj.length;
//         console.log(obj);
//         for(x in obj.data){
//             var ele=document.getElementById("tableBody");
//             var appEle=document.createElement("div");
//             //appEle.innerHTML="<img src='' alt='' class='place__img'><div class='place__content'><span class='place__rating'><i class='ri-star-line place__rating-icon'></i><span class='place__rating-number'></span></span><div class='place__data'><h3 class='place__title'></h3><span class='place__subtitle'></span><span class='place__price'></span></div></div><button class='button button--flex place__button'><i class='ri-arrow-right-line'></i></button>";           
//             appEle.childNodes[0].innerHTML=parseInt(x)+1;
//             appEle.childNodes[1].innerHTML=obj.data[x].name;
//             appEle.childNodes[2].innerHTML=obj.data[x].email;
//             appEle.childNodes[3].innerHTML=obj.data[x].query;
//             ele.appendChild(appEle);
//         }
//     }  
// }
