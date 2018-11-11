class AudioFileUIManager {
    UpdateFileListUI(audioFileList) {
        let fileListCollection = document.getElementById("fileList");
        
        while(fileListCollection.firstChild){
            fileListCollection.removeChild(fileListCollection.firstChild);
        }

        audioFileList.forEach((file) => {
            let anchor = document.createElement("a");
            anchor.className = "collection-item";
            anchor.onclick = () => { anchor.className = "collection-item active" };
            let n = file.lastIndexOf('\\');
            let filenameSubstring = file.substring(n + 1);
            let value = document.createTextNode(filenameSubstring);
            anchor.appendChild(value);
            fileListCollection.appendChild(anchor);
        });
    }
}

module.exports.AudioFileUIManager = AudioFileUIManager;