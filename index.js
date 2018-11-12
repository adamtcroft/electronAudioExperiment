const WaveSurfer = require('wavesurfer.js');

let wavefile;
let normalTextColor = "black-text";
let activeTextColor = "white-text";
let activeBackgroundColor = "lime";
let activeBackgroundAccent = "darken-4";

function Open() {
    ipcRenderer.send('Open')
}

function Play() {
    wavefile.play();
}

function Pause() {
    wavefile.playPause();
}

function Stop() {
    wavefile.stop();
}

function DrawWave(file) {
    if(wavefile != null && wavefile.isPlaying())
    {
        Stop();
    }

    wavefile = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'white',
        progressColor: '#85754d',
        responsive: true,
        height: 40
    });
    wavefile.load(file);
}

function UpdateFileListUI(audioFile) {
    console.log(audioFile);
    let fileListCollection = document.getElementById("fileList");
    let anchor = document.createElement("a");
    anchor.className = "collection-item black-text";
    anchor.onclick = () => {
        IsSomethingSelectedAlready();
        anchor.classList.remove(normalTextColor);
        anchor.classList.add("active");
        anchor.classList.add(activeTextColor);
        anchor.classList.add(activeBackgroundColor);
        anchor.classList.add(activeBackgroundAccent);
        ClearWaveformDrawings();
        DrawWave(audioFile[0]);
    };
    let n = audioFile[0].lastIndexOf('\\');
    let filenameSubstring = audioFile[0].substring(n + 1);
    let value = document.createTextNode(filenameSubstring);
    anchor.appendChild(value);
    fileListCollection.appendChild(anchor);
}

function IsSomethingSelectedAlready() {
    let anchor = document.getElementsByClassName("active");
    if (anchor.length != 0) {
        anchor[0].classList.add(normalTextColor);
        anchor[0].classList.remove(activeTextColor);
        anchor[0].classList.remove(activeBackgroundColor);
        anchor[0].classList.remove(activeBackgroundAccent);
        anchor[0].classList.remove("active");
    }
}

function ClearWaveformDrawings() {
    let waveformDrawing = document.getElementById("waveform");
    while(waveformDrawing.hasChildNodes()){
        waveformDrawing.removeChild(waveformDrawing.childNodes[0]);
    }
}

module.exports.Open = Open;
module.exports.Play = Play;
module.exports.Pause = Pause;
module.exports.Stop = Stop;
module.exports.DrawWave = DrawWave;
module.exports.UpdateFileListUI = UpdateFileListUI;