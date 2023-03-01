$.get(url+":3000/restaurants/display", function (data, status) {

  const restaurant = data;

  for (let i = 0; i < restaurant.length; i++) {
    const card = `<div class="col-lg-4 menu-item">
    <a href="assets/img/menu/menu-item-${restaurant[i].id}.png" class="glightbox"
      ><img
        src="${restaurant[i].image}"
        class="menu-img img-fluid"
        alt=""
    /></a>
    <h4>${restaurant[i].name}</h4>
    <button class="btn btn-danger"  onclick="fun1(${restaurant[i].id})">Check Our Menu</button>
    
  </div>`
  // starter[i].id.addEventListener("click",fun1(starter[i].id));

    $("#dynamicRestaurants").append(card);
  }

});
function fun1(index)
{
  const obj={
    id:index,
  };
    console.log(obj.id);
    localStorage.setItem("res_id",JSON.stringify(obj));


    location.href="menu.html"

}
