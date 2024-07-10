import { useState } from 'react';
import { Document, Page } from 'react-pdf';

function PdfComponent(props) {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div >
          <div className="pdf-div  bg-red-600"  style={{overflow: "scroll"}}>
           <p>
        Page {pageNumber} of {numPages}
      </p>
      <Document file={props.pdfFile} onLoadSuccess={onDocumentLoadSuccess} >
        {Array.apply(null, Array(numPages))
          .map((x, i) => i + 1)
          .map((page) => {
            return (
              <Page
              key={page}
                pageNumber={page}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            );
          })}
      </Document>
   
    </div>

    </div>

  );
}

export default PdfComponent;