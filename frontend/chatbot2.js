$(".chat-button").on("click", function () {
    $(".chat-button").css({ display: "none" });
  
    $(".chat-box").css({ visibility: "visible" });
  });
  
  $(".chat-box .chat-box-header p").on("click", function () {
    $(".chat-button").css({ display: "block" });
    $(".chat-box").css({ visibility: "hidden" });
  });
  
  $("#addExtra").on("click", function () {
    $(".modal").toggleClass("show-modal");
  });
  
  $(".modal-close-button").on("click", function () {
    $(".modal").toggleClass("show-modal");
  });
  
  $("#send").click(function () {
    let input = $("#chatInput");
    let message = input.val();
    // console.log(message);
    //   input.val("");
    if (message != "") {
      $("#messages").append(
        `<div class="chat-box-body-send">
          <p>` +
          message +
          `</p>
          <span>12:00</span>
        </div>`
      );
  
      var $target = $("#messages");
      $target.animate({ scrollTop: $target.height() }, 1000);
      input.val("");
    }
    // let msg=$("#chatInput").text()
    socket.emit('recieve222',message);
  });
  
  const socket = io("ws://localhost:3007");
  socket.on("connection", (s) => {
    $("#messages").append(
      `<div class="chat-box-body-send">
        <p>` +
        `You Joined` +
        `</p>
        <span>12:00</span>
      </div>`
    );
    console.log(s);
    console.log("server connected");
  });
  socket.on("ash", function (msg) {
    console.log(msg);
  });
  // $("#send").click(function () {
  // })
  
  // send a message to the server
  // socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });
  
  // receive a message from the server
  // socket.on("message", function (message) {
  //   console.log(message);
  // });
  