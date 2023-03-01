
const res_id=JSON.parse(localStorage.getItem("res_id"));
//console.log(res_id);

$.ajax({
  type: "post",
  url: url+":3000/menus/getMenu",
  contentType: "application/json",
  data: localStorage.getItem("res_id"),
  xhrFields: { withCredentials: false },
  headers: {},
  success: function (data) {
    let food = data;

    for (let i = 0; i < food.length; i++) {
      
       let itemObj={
         id:food[i].id,
         qt:1,
         price:food[i].price,
         name:food[i].name,
         
       }
      
      // const stringifiedObj = JSON.stringify(itemObj)
     //  console.log();
     if(data[i].category=="Non-Veg")
     {
      const card = `<div class="col-lg-4 menu-item">
      <a href="assets/img/menu/menu-item-${food[i].id}.png" class="glightbox"
        ><img
          src="${food[i].img}"
          class="menu-img img-fluid"
          alt=""
      /></a>
      <h4>${food[i].name}</h4>
      <p class="ingredients">Sell Count : ${food[i].sellCount}</p>
      <p class="price">&#x20B9; ${food[i].price}</p>
      <button class="btn btn-danger"    onclick="fun1('${encodeURIComponent(JSON.stringify(itemObj))}')">add to Cart</button>
    </div>`
    // starter[i].id.addEventListener("click",fun1(starter[i].id));
  
      $("#dynamicNonVeg").append(card);
     } 
     else
     {
      const card = `<div class="col-lg-4 menu-item">
      <a href="assets/img/menu/menu-item-${food[i].id}.png" class="glightbox"
        ><img
          src="${food[i].img}"
          class="menu-img img-fluid"
          alt=""
      /></a>
      <h4>${food[i].name}</h4>
      <p class="ingredients">Sell Count : ${food[i].sellCount}</p>
      <p class="price">&#x20B9; ${food[i].price}</p>
      <button class="btn btn-danger"    onclick="fun1('${encodeURIComponent(JSON.stringify(itemObj))}')">add to Cart</button>
    </div>`
    // starter[i].id.addEventListener("click",fun1(starter[i].id));
  
      $("#dynamicVeg").append(card);
     }
    }

  },
  error: function (xhr, ajaxOptions, thrownError) {
    alert("not able to fetch menu");
  },
});

function fun1(obj)
{
  
  obj = JSON.parse(decodeURIComponent(obj))
 
            const myMap=localStorage.getItem("myMap");
            const cart_id=JSON.parse(localStorage.getItem("cart_id"));
            if(myMap==null || cart_id.id!=res_id.id)
            {
              const map=new Map();
               map.set(obj.id,obj);
               localStorage.myMap = JSON.stringify(Array.from(map.entries()));
               localStorage.setItem("cart_id",JSON.stringify(res_id));
               swal("Succesfully Added to Cart","Account Created Succesfully Please Sign in.","success");
             //  alert("");
            }
           else
            {

             const map= new Map(JSON.parse(localStorage.myMap));
             if(map.get(obj.id)==null)
             {
              map.set(obj.id,obj);
               localStorage.myMap = JSON.stringify(Array.from(map.entries()));
               alert("Succesfully Added to Cart");

            
               }
             else{
              alert("Already Added to Cart");
             }
              
            }
         
 
}



