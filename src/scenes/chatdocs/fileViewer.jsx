/*  //import { PdfViewer } from "./pdfViewer";
 //import {PDFViewer, PDFDownloadLink} from '@react-pdf/renderer';
 import Pdf from "./pdfViewer"

 //import MyDocument from './files/MyDocument';


 const fileName = "Developer Environment setup documentation.pdf";

const FileViewer = ()=>{
    return <div>
        <Pdf filename={fileName} />
        
    </div>
}

export default FileViewer */



//import { pdfjs } from 'react-pdf';
import PdfComponent from "./PdfComponent"



/* pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString(); */
import { pdfjs } from 'react-pdf';
//import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
import { FetchFile } from "./files/showFiles";







const FileViewer = ()=>{
    //console.log(handleViewFile());
    const location = useLocation()
    const myProp = location.state?.heading || 'Default Value';
          //console.log(myProp);
          const fileLocation = `http://localhost:8000/files/${myProp}`
    return <div>

         <PdfComponent pdfFile={fileLocation} />

        
        
    </div>
}


export {FileViewer};
