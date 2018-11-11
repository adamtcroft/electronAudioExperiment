class AudioFileUIManager {
    UpdateFileListUI(audioFileList) {
        let fileListCollection = document.getElementById("fileList");

        while(fileListCollection.firstChild){
            fileListCollection.removeChild(fileListCollection.firstChild);
        }

        audioFileList.forEach((file) => {
            let anchor = document.createElement("a");
            anchor.className = "collection-item";
            anchor.onclick = () => { 
                this.IsSomethingSelectedAlready();
                anchor.classList.add("active");
            };
            let n = file.lastIndexOf('\\');
            let filenameSubstring = file.substring(n + 1);
            let value = document.createTextNode(filenameSubstring);
            anchor.appendChild(value);
            fileListCollection.appendChild(anchor);
        });
    }

    IsSomethingSelectedAlready(){
        let anchor = document.getElementsByClassName("active");
        if(anchor.length != 0){
            anchor[0].classList.remove("active");
        }
    }
}

module.exports.AudioFileUIManager = AudioFileUIManager;