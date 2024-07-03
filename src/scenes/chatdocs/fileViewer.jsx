 import { PdfViewer } from "./pdfViewer";

 const fileName = "Introduction Haematology 24 (1).pdf";

const FileViewer = ()=>{
    return <div>
        <h2>Hello there!</h2>
         <PdfViewer filename={fileName} />
    </div>
}

export default FileViewer