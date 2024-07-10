import { useState, useEffect } from "react";
import svgpdf from "../../../assets/pdf-201f3933.svg";
import svgjpg from "../../../assets/file-image-jpg-svgrepo-com.svg"
import svgpng from "../../../assets/file-image-svgrepo-com.svg"
//import handledocumentClick from "./handledocClick";
import { useNavigate } from 'react-router-dom';
import {FileViewer} from "../fileViewer";

const FetchFile = (heading)=>{
    
  let FileName = heading;
  console.log(FileName);
  return FileName;
}




const ShowFiles = () => {
  const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [documentClicked, setClicked ] = useState(false)
    const [heading, setheading] = useState('This is the current heading')
    const [fileuploadDate, setFileuploadDate] = useState('24-5-6');
    
    //const fileName = "http://localhost:8000/files/Invoice_EUINKE24_27831.pdf";

     useEffect(() => {
      fetch('http://localhost:8000/files')
        .then(response => response.json())
        .then(data => setFiles(data)) // Use parentheses instead of brackets
        .catch(error => console.log(error));
    }, []); 

      // Return date

      const formatDate = (isoString) => {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

    const handledocumentClick=(file,e)=>{
      
    
      setClicked(true);
      

      const { filename, contentType,uploadDate } = file;
      const formattedDate = formatDate(uploadDate);
      
      const targetElement = e.currentTarget;
      
      const nameElement = targetElement.querySelector('h2');
      //const dateElement = targetElement.querySelector('h3');

       
        console.log(nameElement);
        console.log(formattedDate);

         setheading(nameElement.innerHTML);
         setFileuploadDate(formattedDate);
         let heading = file.filename
         console.log(heading);
         FetchFile(heading)

    }

   const handleViewFile = ()=>{
    
     navigate("/fileview", { state: { heading } })
    
    
    
   }

    
    
  
    return (
        <div className="mt-5 p-5 relative">
        <ul className="grid grid-cols-5 gap-5">
          {files.map((file, index) => (
            <li key={index}   className="bg-white text-black " onClick={(e)=>handledocumentClick(file,e)} >

              {file.contentType == 'application/pdf' ?<div>
                
            
                  
                <img src={svgpdf} id="pdfImage"/>
                <h2 >{file.filename}</h2>
              </div> :  file.contentType == "image/png" ? <div>
                <img src={svgpng} className="w-48"/>
              <a href={`http://localhost:8000/${file}`} target="_blank" rel="noopener noreferrer">
                {file.filename}
              </a>
              </div> : file.contentType == "image/jpg" ? <div>
                <img src={svgjpg}/>
              <a href={`http://localhost:8000/${file}`} target="_blank" rel="noopener noreferrer">
                {file.filename}
              </a>
              </div>:<a href={`http://localhost:8000/${file}`} target="_blank" rel="noopener noreferrer">
                {file.filename}
              </a> }
               
            </li>
          ))}
        </ul>
        {documentClicked ? <div className="absolute top-0 ml-10 bg-documentContainerColor p-5 rounded-3xl">
          <section className="flex gap-5">
          <div className="flex">
          <img src={svgpdf} alt="document image" className="w-48"/>
            <div >
            <h2 id="document__name">{heading}</h2>
            <h3>{fileuploadDate}</h3>

            <h2 onClick={handleViewFile}>ViewFile</h2>
            



            </div>



</div>
            

          </section>

          <section className="flex gap-5 p-4">
            <div>
              <h2>Chat with document</h2>
            </div>
            <div>
              <h2>Download document</h2>
            </div>
          </section>
        
        </div>: <div className="hidden"><h2>Not yet clicked</h2></div> }

        

 {/* {documentClicked ?: <h2>Not clicked!</h2> }  */}
      </div>
    );
  };
  
  function App() {
    
        return (
            <div>
              <ShowFiles />
            </div>
          );

    
    
  }
  
  export {App, ShowFiles,FetchFile} ; 


   // console.log("Hello! here are your files")

   

    /* async function retrieveFiles(){
        const res = await fetch('http://localhost:8000/files');
        const files = await res.json()
        console.log(files);
    }

    retrieveFiles(); */

