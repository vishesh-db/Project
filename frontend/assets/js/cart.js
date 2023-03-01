
let map=new Map(JSON.parse(localStorage.myMap));
if(localStorage.getItem("cart_id")!=null)
{

const cart_id=JSON.parse(localStorage.getItem("cart_id"));
if(cart_id.id!=-1)
{

$.ajax({
  type: "post",
  url: url+":80/restaurants/info",
  contentType: "application/json",
  data: localStorage.getItem("cart_id"),
  xhrFields: { withCredentials: false },
  headers: {},
  success: function (data) {
    //console.log(data);
   document.getElementById("resName").innerHTML=data[0].name;
    
  },
  error: function (xhr, ajaxOptions, thrownError) {
    alert("not able to fetch menu");
  },
});
}
}

let count=1;
let totalCost=0;
map.forEach((values,keys)=>{
    console.log(values);
    let subCost=values.qt*values.price;
     const card = ` <div class="row main align-items-center" id="list${keys}">
    <div class="col">
       
        <div class="row">${values.name}</div>
    </div>
    <div class="col">
       <button onclick=decCount(${keys}) class="border">-</button><a href="#" class="border" id="item${values.id}">${values.qt}</a> <button  class="border" onclick=incCount(${keys})>+</button>
    </div>
    <div class="col" id="cost${values.id}">&#x20B9; ${subCost} </div>
</div>
 `
//   // starter[i].id.addEventListener("click",fun1(starter[i].id));
  $("#cart").append(card);

   totalCost+=subCost;
  })
  
  let cost = document.querySelectorAll('.totalCost');

  cost.forEach(function(el) {
    el.innerHTML = "₹"+totalCost;
  });

  function  incCount(key)
  {
     let value=map.get(key);
        value.qt+=1;
        localStorage.myMap = JSON.stringify(Array.from(map.entries()));
        let curmap= new Map(JSON.parse(localStorage.myMap));
        value=curmap.get(key);
        $("#item"+key).html(value.qt);
        
        $("#cost"+key).html("&#x20B9;"+value.qt*value.price);
     
        let cost=0;
        curmap.forEach((values,keys)=>{
          
          let subCost=values.qt*values.price;
          cost+=subCost;
        })
        
        $(".totalCost").html(cost)

        // alert("succesfully increment");
       // console.log(map);
        //console.log("before reload");
      //  window.location.reload();
        
     }
    

  function  decCount(key)
  {
   
     let  value=map.get(key);
     console.log(value);
      if(value.qt==1)
      {
         map.delete(key);
         $("#list"+key).remove();
         if(map.size==0)
         {
            let obj={
               id :-1
            }
             localStorage.setItem("cart_id",JSON.stringify(obj));
         }
         localStorage.myMap = JSON.stringify(Array.from(map.entries()));
      }
      else
      {
        value.qt-=1;
        localStorage.myMap = JSON.stringify(Array.from(map.entries()));
        let curmap= new Map(JSON.parse(localStorage.myMap));
        value=curmap.get(key);
        
        $("#item"+key).html(value.qt);
        
        
        $("#cost"+key).html("&#x20B9;"+value.qt*value.price);
        
        let cost=0;
        curmap.forEach((values,keys)=>{
          
          let subCost=values.qt*values.price;
          cost+=subCost;
        })
        
        $(".totalCost").html(cost)

      }
     
      // window.location.reload();
    
    
  }
    
  

function prepareOrder()
{
   console.log("hello World");
  
   const cart_id=JSON.parse(localStorage.getItem("cart_id"));

    
    const map= new Map(JSON.parse(localStorage.myMap));
    const items=[]; 
    let  cost=0;
     map.forEach((values,keys)=>{
        //  console.log(values);
       
          items.push(JSON.stringify(values));
          cost+=values.price*values.qt;
          //console.log(items);
      });
      const cartObj={
         user_id:user._id,
         res_id:cart_id.id,
          items:items,
          total:cost,
          status:"Order_in",

     }
     
     $.ajax({
         type: "post",
         url: url+":80/order/saveOrder",
         contentType: "application/json",
         data: JSON.stringify(cartObj),
         xhrFields: { withCredentials: false },
         headers: {},
         success: function (data) {
          const obj={
            id : -1
          };
          localStorage.setItem("cart_id",JSON.stringify(obj));
          const map=new Map();
          localStorage.myMap = JSON.stringify(Array.from(map.entries()));
          alert("Order Placed Succesfully...!");
          window.location.reload();

           
         },
         error: function (xhr, ajaxOptions, thrownError) {
           alert("not able to place order");
         },
       });
    

}