// $.get(url+":3007/getRooms", (data, success) => {
//   console.log(data);
// });
const socket = io("ws://localhost:3007");
socket.on("connection", function (msg) {
  console.log(msg);
});

socket.on("newRooms", function (message) {
  console.log("newRooms:::", message);
  $("#tableBody").empty();
  localStorage.setItem("rooms", message);
  let rooms = JSON.parse(localStorage.getItem("rooms"));
  manipulate(rooms);
});

socket.on("DisconnectAdmin", function (message) {
  console.log("DisconnectAdmin:::", message);
  $("#tableBody").empty();
  localStorage.setItem("rooms", message);
  let rooms = JSON.parse(localStorage.getItem("rooms"));
  manipulate(rooms);
});

function manipulate(rooms) {
  for (let i = 0; i < rooms.length; i++) {
    $("#tableBody").append(
      ` <tr>
          <td class="border-top-0">` +
        (i + 1) +
        `</td>
          <td class="border-top-0">` +
        rooms[i].name +
        `</td>
          <td class="border-top-0"><a style="cursor:pointer" id=` +
        rooms[i].id +
        `>Join</a></td>
        </tr>`
    );
    $("#" + rooms[i].id).click(function () {
      window.location.href = "/room.html#" + rooms[i].id+"#"+rooms[i].name;
    });
  }
}
$(document).ready(function () {
  let rooms = localStorage.getItem("rooms");
  if (rooms != null) {
    let rooms = JSON.parse(localStorage.getItem("rooms"));
    manipulate(rooms);
  }
});
// window.onbeforeunload=function(){
//   localStorage.removeItem("rooms");
// }
// window.onload=function(){
//   socket.on("newRooms", function (message) {
//     console.log("newRooms:::", message);
//     $("#tableBody").empty();
//     localStorage.setItem("rooms", message);
//     let rooms = JSON.parse(localStorage.getItem("rooms"));
//     manipulate(rooms);
//   });
// }