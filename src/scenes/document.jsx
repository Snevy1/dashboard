import { useState } from "react"
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

const handleViewFolder = (folderName)=>{
    setViewFolder(true);
    console.log("No content here!");
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

export default Document