function addOrderToRestaurant(status, newOrders)
{
    for(order of newOrders)
    {
        let orderTemplate = `
                <div class="orderin-bx d-flex align-items-center justify-content-between mt-1">
                    <div>
                        <h4>${status} #${order.orderId}</h4>
                        <span>${order.date}</span>
                    </div>
                    <div class="d-flex align-items-center">
                        <h5 class="text mb-0 me-1">${order.total}</h5>
                        <div id="orderDetail" onclick="addOrderDetail(${order.orderId})" class="icon-bx"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25"><path fill="none" d="M0 0h24v24H0z"/><path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" fill="white"/></svg></div>
                    </div>
                </div>    
                        `;
        if(status == "Order_in")
        {
            $("#nav-order").append(orderTemplate);
        }
        else if(status == "prepared")
        {
            $("#nav-prepared").append(orderTemplate);
        }
        else if(status == "delivered")
        {
            $("#nav-delivered").append(orderTemplate);
        }

    }
}


function addOrderDetailsToRest(orderData)
{

    let temp1 = `
            <h4 class="cate-title mb-sm-3 mb-2 mt-xl-0 mt-3">Order Details</h4>
            <div class="card h-auto">
                <div class="card-body">
                    <div class="d-flex align-items-center justify-content-between border-bottom flex-wrap">
                        <div class="mb-4">
                            <h4 class="font-w500">Order #${orderData.orderId}</h4>
                            <span>${orderData.date}</span>
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
                                    <h4 class="mb-0 font-w700">${orderData.address.street}, ${orderData.address.locality}, ${orderData.address.city}</h4>
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
        temp2+=`<div class="d-flex align-items-center mb-4">
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
            </div>`
            
    let temp4=``;
                if(orderData.status == "Order_in")
                {
                    temp4+=`
                    <div class="status">
                        <div class="text-end mt-3">    
                            <a href="javascript:void(0);" onclick="acceptOrder(${orderData.orderId},${orderData.restaurant_id},'rejected')" class="btn btn-outline-danger me-sm-4 me-2">Reject Order</a>
                            <a href="javascript:void(0);" onclick="acceptOrder(${orderData.orderId},${orderData.restaurant_id},'accepted')" class="btn btn-warning">Accept Order</a>
                        </div>
                    </div>
                    `
                }
                else
                {
                    temp4+=`
                    <div class="status">
                        <div class="text-end mt-3">    
                        <h4>Order is ${orderData.status}</h4>
                        </div>
                    </div>  
                    `
                }
           
                                
    let orderDetailsTemplate = temp1+temp2+temp3+temp4;
    $("#order_detail").html('');
    $("#order_detail").append(orderDetailsTemplate);
}

function addNewOrder(currentOrders, newOrdersData)
{
    if(currentOrders.length > newOrdersData.length)
    {
        
    }
    const mergedArray = [...currentOrders, ...newOrdersData];
    const frequencyTable = {};
    
    mergedArray.forEach(obj => {
        const key = obj.orderId;
        frequencyTable[key] = (frequencyTable[key] || 0) + 1;
    });
    
    const nonDuplicateObjects = mergedArray.filter(obj => {
        const key = obj.orderId;
        return frequencyTable[key] === 1 && currentOrders.length;
    });
    if(currentOrders.length > newOrdersData.length)
    {
        const index = currentOrders.indexOf(...nonDuplicateObjects);
        
        if (index > -1) {
            currentOrders.splice(index, 1);
        }
        return [];
    }
    else{
        currentOrders.push(...nonDuplicateObjects);
        return nonDuplicateObjects;
    }
}

async function getNewOrdersApi(restaurant_id,status,currentOrders)
{
    let newOrdersData;
    await $.ajax({
        method:'POST',
        url:url+":80/order/fetchRestaurantOrders/"+restaurant_id+"/"+status,
        success:(data)=>{newOrdersData=data}
    });
    if(currentOrders.length == 0)
    {
        addOrderToRestaurant(status, newOrdersData);
        currentOrders.push(...newOrdersData);
    }   
    else
    {
        let newOrder= addNewOrder(currentOrders, newOrdersData); 
        addOrderToRestaurant(status, newOrder);
    }
    
}

async function getOrerDetailApiCall(restaurant_id,orderId)
{
    let orderData;
    await $.ajax({
        method:'GET',
        url:'http://localhost:80/order/fetchRestaurantOrders/'+restaurant_id+'/'+orderId,
        success: (data)=>{orderData = data},
        error: (error)=>{alert("Error while fetching query","bg-danger");}
    });
    addOrderDetailsToRest(...orderData);
}

function addOrderDetail(orderId){
    let restaurant_id = 1;
    getOrerDetailApiCall(restaurant_id,orderId);
};

async function acceptOrder(orderId,restaurant_id,status){
    let prepData;
    await $.ajax({
        method:'POST',
        url: 'http://localhost:80/order/updateRestaurantOrder/'+restaurant_id+'/'+orderId+'/'+status,
        contentType:'application/json',
        success:(data)=>{prepData= data},
        error: (error)=>alert("Something went wrong while accepting "+error)
    })
    if(prepData.modifiedCount ==1)
    {
        $(".text-end").remove();
        let orderStatus = `<div class="text-end mt-3" ><h4>Order is ${status}</h4></div>`;
        $(".status").append(orderStatus);
    }
}


$(document).ready(()=>{
    let restaurant_id = 1;
    var currentOrders=[];
    setInterval(()=> getNewOrdersApi(restaurant_id,"Order_in",currentOrders),1000);
    
    var prepOrders = [];
    setInterval(()=> getNewOrdersApi(restaurant_id,"prepared",prepOrders),2000);
   
});
