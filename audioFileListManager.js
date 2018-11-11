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
        let success;
        filepaths.forEach((path) =>{
            if(!(this.FileAlreadyExists(path))){
                this.audioFileList.push(path);
                success =  true;
            }
            else{
                success = false;
            }
        });
        return success;
    }

    PrintFileList(){
        console.log(this.audioFileList);
    }
}

module.exports.AudioFileListManager = AudioFileListManager;