import { useState, useEffect } from "react";
import svgpdf from "../../../assets/pdf-201f3933.svg";
import svgjpg from "../../../assets/file-image-jpg-svgrepo-com.svg"
import svgpng from "../../../assets/file-image-svgrepo-com.svg"

const ShowImages = () => {
    const [files, setFiles] = useState([]);

     useEffect(() => {
      fetch('http://localhost:8000/images')
        .then(response => response.json())
        .then(data => setFiles(data)) // Use parentheses instead of brackets
        .catch(error => console.log(error));
    }, []); 

    
  
    return (
        <div className="mt-5 p-5">
        <ul className="grid grid-cols-5 gap-5">
          {files.map((file, index) => (
            <li key={index} className="bg-white p-2 text-black">
              {file.contentType == 'application/pdf' ? <div>
                <img src={svgpdf}/>
              <a href={`http://localhost:8000/${file}`} target="_blank" rel="noopener noreferrer">
                {file.filename}
              </a>
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
      </div>
    );
  };
  
  function ShowImagesContainer() {
    
        return (
            <div>
              < ShowImages />
            </div>
          );

    
    
  }
  
  export default ShowImagesContainer; 
