const WaveSurfer = require('wavesurfer.js');

let wavefile;

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
    wavefile = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'white',
        progressColor: '#85754d',
        responsive: true,
        height: 40
    });
    wavefile.load(file);
}

function UpdateFileListUI(audioFileList) {
    let fileListCollection = document.getElementById("fileList");

    while (fileListCollection.firstChild) {
        fileListCollection.removeChild(fileListCollection.firstChild);
    }

    audioFileList.forEach((file) => {
        let anchor = document.createElement("a");
        anchor.className = "collection-item";
        anchor.onclick = () => {
            IsSomethingSelectedAlready();
            anchor.classList.add("active");
            //DrawWave(file);
        };
        let n = file.lastIndexOf('\\');
        let filenameSubstring = file.substring(n + 1);
        let value = document.createTextNode(filenameSubstring);
        anchor.appendChild(value);
        fileListCollection.appendChild(anchor);
    });
}

function IsSomethingSelectedAlready() {
    let anchor = document.getElementsByClassName("active");
    if (anchor.length != 0) {
        anchor[0].classList.remove("active");
    }
}

module.exports.Open = Open;
module.exports.Play = Play;
module.exports.Pause = Pause;
module.exports.Stop = Stop;
module.exports.DrawWave = DrawWave;
module.exports.UpdateFileListUI = UpdateFileListUI;