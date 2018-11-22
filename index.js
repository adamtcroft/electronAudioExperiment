const WaveSurfer = require('wavesurfer.js');

let wavefile;
let EQ;
let normalTextColor = "black-text";
let activeTextColor = "white-text";
let activeBackgroundColor = "lime";
let activeBackgroundAccent = "darken-4";

function Open() {
    ipcRenderer.send('Open')
}

function Remove() {
    var anchor = document.getElementsByClassName("active");
    if (anchor.length != 0) {
        Stop();
        ClearWaveformDrawings();
        ipcRenderer.send('Remove', anchor[0].innerHTML);
        anchor[0].remove();
    }
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
    if (wavefile != null && wavefile.isPlaying()) {
        Stop();
    }

    wavefile = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'white',
        progressColor: '#827717',
        responsive: true,
        height: 40
    });
    wavefile.load(file);

    wavefile.on('ready', () =>{
        EQ = [
            {
                f: 32,
                type: 'lowshelf'
            },{
                f: 125,
                type: 'peaking'
            },{
                f: 250,
                type: 'peaking'
            },{
                f: 500,
                type: 'peaking'
            },{
                f: 2000,
                type: 'peaking'
            },{
                f: 8000,
                type: 'peaking'
            },{
                f: 16000,
                type: 'highshelf'
            }
        ];

        // Create Filters
        var filters = EQ.map((band) => {
            var filter = wavefile.backend.ac.createBiquadFilter();
            filter.type = band.type;
            filter.gain.value = 0;
            filter.Q.value = 1;
            filter.frequency.value = band.f;
            return filter;
        });

        wavefile.backend.setFilters(filters);

        var container = document.getElementsByClassName("EQ");
        filters.forEach((filter) => {
            var input = document.createElement('input');
            wavefile.util.extend(input, {
                type: 'range',
                min: -40,
                max: 40,
                value: 0,
                title: filter.frequency.value
            });
            input.style.display = "inline-block";
            wavefile.drawer.style(input, {
                'webkitTransform': 'rotate(90deg)',
                height: '30px',
                width: '50px'
            });
            container[0].appendChild(input);
        });
    });
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
    if (wavefile != null) {
        wavefile.empty();
        let waveformDrawing = document.getElementById("waveform");
        while (waveformDrawing.hasChildNodes()) {
            waveformDrawing.removeChild(waveformDrawing.childNodes[0]);
        }
    }
}

module.exports.Open = Open;
module.exports.Play = Play;
module.exports.Pause = Pause;
module.exports.Stop = Stop;
module.exports.Remove = Remove;
module.exports.DrawWave = DrawWave;
module.exports.UpdateFileListUI = UpdateFileListUI;