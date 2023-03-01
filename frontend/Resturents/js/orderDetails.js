function addOrderDetailsToRest(orderData)
{
    let temp1 = `
            <h4 class="cate-title mb-sm-3 mb-2 mt-xl-0 mt-3">Order Details</h4>
            <div class="card h-auto">
                <div class="card-body">
                    <div class="d-flex align-items-center justify-content-between border-bottom flex-wrap">
                        <div class="mb-4">
                            <h4 class="font-w500">Order #${orderData.orderId}</h4>
                            <span>${orderData.date}/span>
                        </div>
                        <div class="orders-img d-flex mb-4">
                            <img src="images/User/bha.jpg" alt="">
                            <div>
                                <h6 class="font-w500">Bhaskar</h6>
                                <span>User since 2022</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row border-bottom pb-2">

                        <div class="col-xl-6">
                            <div class="address-bx mt-3">
                                <span class="d-block mb-2">Delivery Address</span>
                                <div class="d-flex align-items-center mb-2">
                                    <h4 class="mb-0 font-w700">${orderData.address}</h4>
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-4">
                            <div class="d-flex align-items-center justify-content-between mt-3">
                                <span>Estimation Time </span>
                                
                            </div>
                            <div class="d-flex align-items-center justify-content-between mb-3">
                                <h6 class="mb-0">10 Min </h6>
                                
                            </div>
                        </div>
                        <div class="col-xl-2"></div>
                    </div>
                    <div class="order-menu style-1 mt-3">
                        <h4>Order Menu</h4>`
    let temp2=``;
    $.each(orderData.items, (i)=>{
        temp1+=`<div class="d-flex align-items-center mb-4">
        <img class="me-3" src="images/Menu/pizza1.jpg" alt="">
        <div>
            <h4 class="item font-w600 text-nowrap mb-0"><a href="javascript:void(0);">${orderData.items[i].item}</a></h4>
            <p class="mb-0">X${orderData.items[i].quantity}</p>
        </div>
        <h4 class="text mb-0 ms-auto">${orderData.items[i].price}</h4>
    </div>`
    })
                        
    let temp3=`
                </div>
                    <hr style="opacity:0.7" />
                    <div class="d-flex align-items-center justify-content-between">
                        <h4 class="font-w500 mb-0">Total</h4>
                        <h4 class="cate-title text">$12.59</h4>
                    </div>
                </div>
            </div>
            <div class="text-end mt-3">
                <a href="javascript:void(0);" class="btn btn-outline-danger me-sm-4 me-2">Reject Order</a>
                <a href="javascript:void(0);" class="btn btn-warning">Accept Order</a>
            </div>
                                `
    let orderDetailsTemplate = temp1+temp2+temp3;
    $("#order_detail").append(orderDetailsTemplate);
}


async function getOrerDetailApiCall(restaurant_id,orderId)
{
    let orderData;
    await $.ajax({
        method:'GET',
        url:'http://localhost:3000/order/fetchRestaurantOrders/'+restaurant_id+'/'+orderId,
        success: (data)=>{orderData = data},
        error: (error)=>{alert("Error while fetching query","bg-danger");}
    });
    addOrderDetailsToRest(orderData);
}


$(document).ready(()=>{
    $("#aicon").click(async(event)=>{
        event.preventDefault();
        let orderId = window.location.hash.slice(1);
        console.log(orderId);
        let restaurant_id = 1;
        await getOrerDetailApiCall(restaurant_id,orderId);
    })
})