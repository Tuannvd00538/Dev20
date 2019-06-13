$(document).ready(() => {
    var socket = io(`https://devhaichuc.herokuapp.com/`);

    var snd = new Audio('../audio/canhbao.mp3');

    socket.on("PushTempratureToClient", (temperature, ownerId, isWarning) => {
        if (isWarning) {
            if (snd.duration > 0 && !snd.paused) {

                console.log("Playing");


            } else {

                snd.play();

            }
            swal("Cảnh Báo!", `Bệnh nhân ${ownerId} cần được cấp cứu!!!`, "error");
        }
    });
});