

import React, { useState } from 'react';
import axios from 'axios';

import CreateFolder from './createFolder';
import Fetchfolders from './fetchFolders';

const Document = () => {
  const [folderId, setFolderId] = useState('');
  const [file, setFile] = useState(null);

  const handleFolderChange = (e) => {
    setFolderId(e.target.value);
    
  };

  const handleFileChange = (e) => {
    
    setFile(e.target.files[0]);
  };

  const handleFileUpload = (event) => {
    event.preventDefault();
    if (!file || !folderId) {
      alert('Please select a file and a folder');
      return;
    }

    console.log(folderId);

    const formData = new FormData();
    formData.append('folderId', folderId.toLocaleLowerCase());
    formData.append('file', file);
    

    axios({
      url: 'http://127.0.0.1:8000/upload',
      method: 'POST',
      headers: {
        authorization: 'your token comes here', // Replace with your actual token
      },
      data: formData,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <CreateFolder />
      <div>
      <form onSubmit={handleFileUpload}>
        <div>
          <label htmlFor="folder">Select Folder:</label>
          <input
            type="text"
            id="folder"
            value={folderId}
            onChange={handleFolderChange}
            placeholder="Enter Folder ID"
            className='bg-black'
          />
        </div>
        <div>
          <label htmlFor="file">Select File:</label>
          <input type="file" id="file" onChange={handleFileChange} />
        </div>
        <button type="submit">Upload File</button>
      </form>
        
      </div>

      <div>
        <h2>These are folders present</h2>
        <Fetchfolders />
      </div>



    </div>
  );
};

export default Document;



















/* import { useState } from "react"
import {folders} from "./data"
import FolderIcon from '@mui/icons-material/Folder';
import FetchfolderDetails from "./folderDetails";


const Document = ()=>{
    const [value, setValue] = useState("");
    const [submited, setSubmited] = useState(false);
    const [folderdata, setFolderData] = useState(folders);
    const [viewFolder, setViewFolder] = useState(false);
    const [folderName, setFolderName] = useState("");
    

    const handleCreateClick = ()=>{
    let createFolderButton = document.querySelector(".createFolderButton");
    let  createFolderContainer = document.querySelector(".create_folderContainer");
        
     
        createFolderContainer.style.display = "grid";
        createFolderButton.style.display = "none"
        
    }

    const handleInput = (event)=>{
        //let valueInput = document.querySelector(".folder_name").value;

          setValue(event.target.value);

    }

    const handleSubmit = ()=>{
    let createFolderButton = document.querySelector(".createFolderButton");
    let  createFolderContainer = document.querySelector(".create_folderContainer");
    let InputElement = document.querySelector(".folder_name");
   
    createFolderContainer.style.display = "none";
    createFolderButton.style.display = "grid"
    folders.unshift({
        name: InputElement.value,
        topic: "testing"
    }) 
   

    let newFolders = [...folders];

    

    
    
    
    setSubmited(true);
    
    setFolderData(newFolders);
    console.log(newFolders);
    setValue("");
    

    }
    const handleCancel = ()=>{
    let createFolderButton = document.querySelector(".createFolderButton");
    let  createFolderContainer = document.querySelector(".create_folderContainer");
    createFolderContainer.style.display = "none";
    createFolderButton.style.display = "grid"

    }

/*     ====View Folder Contents======= */

/* const handleViewFolder = (folderName)=>{
    setViewFolder(true);
    setFolderName(folderName);
}


    return (<div>
        <h2>Hello there I am the doc!</h2>
        <div>
        <div className="grid justify-center createFolderButton">
            <button onClick={handleCreateClick} >Create Folder</button>
         </div>
        <div className="hidden justify-center mt-5 create_folderContainer">
            <input type="text" className="bg-black folder_name" value={value} onChange={handleInput}  />
            <div className="flex gap-5 mt-4">
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleSubmit}>Create Folder</button>
            </div>
        </div>



        </div>
        { !viewFolder ? 
        <div className="grid grid-cols-4 gap-5">
        {folderdata.map((element)=>{
            return(
                    <div key={element.name}>
                <FolderIcon   color="secondary" fontSize="large"  onClick={()=>handleViewFolder(element.name)} />
                    <h2>{element.name}</h2>

                </div>

                
                

                
)

        })}


    


        


    </div>: <div>
        <FetchfolderDetails FolderName={folderName}/>
        <h2>{folderName}</h2>
    </div>

        }
        
        
        
    </div>)
}
 */
///export default Document