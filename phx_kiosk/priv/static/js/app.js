var socket = null;
var channel = null;

socket = new Phoenix.Socket("/socket");
socket.connect();
channel = socket.channel("home:lobby")

channel.join()
    .receive("ok", resp =>
      { console.log("Joined successfully", resp) })
    .receive("error", resp =>
      { console.log("Unable to join", resp) })

var brightnessSlider = document.getElementById("brightnessRange");

channel.on("brightness", payload => {
   brightnessSlider.value = payload.value;
})

brightnessSlider.oninput = function() {
   channel.push("brightness", {value: parseInt(this.value)});
   console.log("Brightness:" + this.value);
}
