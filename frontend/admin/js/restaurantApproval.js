function handleRestaurant(obj) {
  $.ajax({
    type: "POST",
    url: url+":3000/restaurants/approve",
    contentType: "application/json",
    data: JSON.stringify(obj),
    xhrFields: { withCredentials: false },
    headers: {},
    success: function (data) {
      console.log("Success");
      window.location.reload();
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log(xhr.responseText);
    },
  });
}

$(document).ready(function () {
  $.get(
    url+":3000/restaurants/pendingRestaurants",
    function (obj, status) {
      obj = JSON.parse(obj);
      console.log(obj);
      for (let i = 0; i < obj.length; i++) {
        $("#pendingRestaurants").append(`
        <div class="accordion-item">
        <h2 class="accordion-header" id="restaurant${i}" >
          <button
            class="accordion-button collapsed font-bold btn-outline-dark"
            style="letter-spacing:2px;"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse${i}"
            aria-expanded="false"
            aria-controls="collapse${i}"
          >
            ${obj[i].name}
          </button>
        </h2>
        <div
          id="collapse${i}"
          class="accordion-collapse collapse"
          aria-labelledby="restaurant${i}"
          data-bs-parent="#pendingRestaurants"
        >
          <div class="accordion-body row justify-content-center">
            <div class="col-3">
            <a
            href="${obj[i].image}"
            target="_blank"
            >
              <img
                src="${obj[i].image}"
                alt=""
                style="width: 15rem; height: 10rem; border-radius:15px;"
              />
              </a>
            </div>
            <div class="col-3">
            <a
            href="${obj[i].fssaiCertificate}"
            target="_blank"
            >
              <img
                src="${obj[i].fssaiCertificate}"
                alt=""
                style="width: 15rem; height: 10rem;border-radius:15px"
              />
              </a>
              
            </div>
            <div class="col-4">
            <div style="font-size:25px;font-weight:600;letter-spacing:2px">
              <div>Email:${obj[i].email}</div>
              <div>Address: ${obj[i].address.street} , ${obj[i].address.locality}</div>
              <div>City : ${obj[i].address.city}, ${obj[i].address.pincode}</div>
            </div>
              <div class="row ">
                <button class="btn btn-block col-4 btn-outline-danger btn-rounded reject mx-3" id="rej${obj[i].id}">
                  Reject
                </button>
                <button class="btn btn-block col-4 btn-outline-success btn-rounded accept" id="acc${obj[i].id}">
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
        `);
      }
      $(".reject").click(function () {
        let id = this.id.substring(3);
        obj = {
          id: id,
          status: "rejected",
        };
        handleRestaurant(obj);
        console.log(id);
      });
      $(".accept").click(function () {
        //   handleRestaurant(this);
        let id = this.id.substring(3);
        obj = {
          id: id,
          status: "approved",
        };
        handleRestaurant(obj);
        console.log(id);
      });
    }
  );
});
