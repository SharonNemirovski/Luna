import React from 'react'
import FileViewer from "react-file-viewer"
import "./FileViewer.scss"

function Fileviewer({FileType , FilePath , onclosingview}) {

    const onError = (err) => {
        console.log(err);

    }
    return (
        <div className = "rootViewer">
            <div className = "content">
            <FileViewer fileType = {FileType} filePath = {FilePath} onError = {onError} />
            <div className = "form">
            <div className = "actions">
            <button onClick = {()=>{onclosingview()}}>close</button>
            </div>
            </div>
            </div>      
        </div>
    )
}

export default Fileviewer
