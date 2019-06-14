$(document).ready(() => {
    var socket = io(`https://devhaichuc.herokuapp.com/`);

    var list = JSON.parse(localStorage.getItem('res'));

    var snd = new Audio('../audio/canhbao.mp3');

    socket.on("PushTempratureToClient", (temperature, ownerId, isWarning) => {
        if (isWarning) {
            if (snd.duration > 0 && !snd.paused) {

                console.log("Playing");


            } else {

                snd.play();

            }
            let nameRoom = "";
            let nameUser = "";
            list.forEach(e => {
                e.forEach(element => {
                    element.list.forEach(ee => {
                        if (ee.patientId == ownerId) {
                            nameRoom = element.name;
                            nameUser = ee.patientName
                        }
                    });
                });
            });
            swal("Cảnh Báo!", `Bệnh nhân ${nameUser} tại phòng ${nameRoom} cần được cấp cứu!!!`, "error");
        }
    });
});