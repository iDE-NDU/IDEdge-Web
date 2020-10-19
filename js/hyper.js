var mainVideo = document.getElementById("idev");
var mainAccompany = document.getElementById("accompany");

function play_Pause() {
    if (mainVideo.paused) {
        mainVideo.play();
        mainAccompany.play();
    } else {
        mainVideo.pause();
        mainAccompany.pause();
    }
}