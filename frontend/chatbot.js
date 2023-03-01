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

let id = JSON.parse(localStorage.getItem("loggedInUser"))._id;
let curname = JSON.parse(localStorage.getItem("loggedInUser")).name;
console.log("ID::::::: ", id);
$("#send").click(function () {
  let input = $("#chatInput");
  let message = input.val();
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
  }
  socket.emit("recieve", id, message);
});
const socket = io("ws://localhost:3007");
socket.on("connection", function (msg) {
  console.log(msg);
  socket.emit("newUser", { name: curname, id: id }, "Hello darling");
});
socket.on("msg", function (msg) {
  console.log(msg);
  console.log(JSON.parse(localStorage.getItem("loggedInUser")));
  if (JSON.parse(localStorage.getItem("loggedInUser"))._id === msg.id) {
    $("#messages").append(
      `<div class="chat-box-body-receive">
		<p>` +
        msg.message +
        `</p>
		<span>12:00</span>
	  </div>`
    );
  }
});
socket.on("ack", function (msg) {
  console.log(msg);
  if (msg != "") {
    $("#messages").append(
      `<div class="chat-box-body-receive">
		<p>` +
        msg +
        `</p>
		<span>12:00</span>
	  </div>`
    );

    var $target = $("#messages");
    $target.animate({ scrollTop: $target.height() }, 1000);
  }
});

// receive a message from the server
socket.on("message", function (message) {
  console.log(message);
});
