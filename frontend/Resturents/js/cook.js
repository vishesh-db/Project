async function orderPrepared(restaurant_id,orderId, status)
{
    let prepData;
    await $.ajax({
        method:'POST',
        url: 'http://localhost:3000/order/updateRestaurantOrder/'+restaurant_id+'/'+orderId+'/'+status,
        contentType:'application/json',
        success:(data)=>{prepData= data},
        error: (error)=>alert("Something went wrong while accepting "+error)
    })
    if(prepData.modifiedCount ==1)
    {
        $("#"+orderId).fadeOut();
    }
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

function addOrderToRestaurant(newOrders)
{
    for(obj of newOrders)
    {
        let templateString1 = '<div id = "' + obj.orderId + '"style="display:none" class="col-xs-12 col-sm-6 col-md-4"><div class="card mb-4" style="background-color:rgb(250, 246, 239)"><div class="card-body"><h5 class="card-title" style="text-align :center">Ordered id :' + obj.orderId + ' </h5><table id="" class="table"><thead class="thead"><tr><th scope="col" id="sl">#</th><th scope="col" id="item">Items</th>  </tr></thead><tbody id = "itemBody">';

        var ind = 0;
        var templateString2 = '';
        $.each(obj.items, function (j) {
            templateString2 += '<tr><th scope="row" id="sl">' + (ind + 1) + '</th><td id="item">' + obj.items[j].item + ' X' + obj.items[j].quantity + '</td></tr>';
            ind++;
        });

        let templateString3 = `</tbody></table><div class="d-flex justify-content-center"><a class="btn btn-outline-success bgl-success btn-block" onclick="orderPrepared(1,${obj.orderId},'prepared')" href="#${obj.orderId}" >Done</a></div></div></div></div>`;
        let templateString = templateString1 + templateString2 + templateString3;
        $("#cardbody").append(templateString);

        let x = $("#cardbody").children().last();
        setTimeout(() => x.slideDown(), 500);

    }
}

async function getAcceptedapiCall(currentOrders)
{
    const restaurant_id = 1;
    const status = 'accepted';
    await $.ajax({
        method:'POST',
        url:url+":3000/order/fetchRestaurantOrders/"+restaurant_id+"/"+status,
        success:(data)=>{newOrdersData=data}
    });
    if(currentOrders.length == 0)
    {
        addOrderToRestaurant(newOrdersData);
        currentOrders.push(...newOrdersData);
    }   
    else
    {
        let newOrder= addNewOrder(currentOrders, newOrdersData); 
        addOrderToRestaurant(newOrder);
    }
}


$(document).ready(() => {
    
    var currentOrders = [];
    setInterval(()=>getAcceptedapiCall(currentOrders), 1000);

});

