class AudioFileListManager {

    constructor() {
        this.audioFileList = [];
    };

    FileAlreadyExists(filepath) {
        if (this.audioFileList.includes(filepath)) {
            return true;
        }
        else {
            return false;
        }
    }

    AddToList(filepaths) {
        filepaths.forEach((path) =>{
            if(!(this.FileAlreadyExists(path))){
                this.audioFileList.push(path)
            }
        });
    }

    PrintFileList(){
        console.log(this.audioFileList);
    }
}

module.exports.AudioFileListManager = AudioFileListManager;