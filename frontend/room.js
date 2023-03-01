let rooms = window.location.hash;
rooms = rooms.split("#");
let custname = rooms[2];
let room = rooms[1];
const socket = io("ws://localhost:3007");
socket.on("connection", function (msg) {
  console.log(msg);
  socket.emit("newAdmin", room, "Hello world");
});
socket.on("msg", function (msg) {
  console.log(msg);
  let time = new Date().toLocaleTimeString();
  $("#chats").append(
    `<div class="msg left-msg">
    <div class="msg-bubble">
      <div class="msg-info">
        <div class="msg-info-name">` +
      custname +
      `</div>
        <div class="msg-info-time">` +
      time +
      `</div>
      </div>

      <div class="msg-text">` +
      msg +
      `</div>
    </div>
  </div>`
  );
  socket.emit("message", room, "msg from admin");
});

$("#send").click(function () {
  let msg = $("#inputmsg").val();
  if (msg != "") {
    let time = new Date().toLocaleTimeString();
    $("#chats").append(
      `<div class="msg right-msg">
            <div class="msg-bubble">
              <div class="msg-info">
                <div class="msg-info-name">You</div>
                <div class="msg-info-time">` +
        time +
        `</div>
              </div>
      
              <div class="msg-text">
                ` +
        msg +
        `
              </div>
            </div>
          </div>`
    );
    socket.emit("adminmsg", room, msg);
  }
});
