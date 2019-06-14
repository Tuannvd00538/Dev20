$(document).ready(() => {
    var socket = io(`https://devhaichuc.herokuapp.com/`);

    var list = JSON.parse(localStorage.getItem('res'))[0];

    var snd = new Audio('../audio/canhbao.mp3');

    socket.on("PushTempratureToClient", (temperature, ownerId, isWarning) => {
        if (isWarning) {
            if (snd.duration > 0 && !snd.paused) {

                console.log("Playing");


            } else {

                snd.play();

            }
            let nameRoom = list.name;
            let nameUser = "";
            list.list.forEach(element => {
                if (element.patientId == ownerId) {
                    nameUser = element.patientName
                }
            });
            swal("Cảnh Báo!", `Bệnh nhân ${nameUser} tại phòng ${nameRoom} cần được cấp cứu!!!`, "error");
        }
    });
});