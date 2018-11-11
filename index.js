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

function DrawWave() {
    wavefile = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'white',
        progressColor: '#85754d',
        responsive: true,
        height: 40
    });
    wavefile.load(filepath);
}

module.exports.Open = Open;
module.exports.Play = Play;
module.exports.Pause = Pause;
module.exports.Stop = Stop;
module.exports.DrawWave = DrawWave;