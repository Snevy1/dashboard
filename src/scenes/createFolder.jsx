import { useState } from "react";
import axios from "axios";
import Fetchfolders from "./fetchFolders";
import { useEffect } from "react";
function CreateFolder() {
    const [folderName, setFolderName] = useState('');

    
  
    const handleCreateFolder = () => {

       fetch('http://127.0.0.1:8000/folders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: folderName.toLocaleLowerCase(), userId: 'user123' }) // Replace with actual userId
      })
      .then(response => response.json())
      .then(data => console.log(data));
      setFetchFolders(true);
      
    };

    
  
    return (
      <div>
        <input type="text" value={folderName} onChange={(e) => setFolderName(e.target.value)} className="bg-stone-700"/>
        <button onClick={handleCreateFolder}>Create Folder</button>
      </div>
    );
  }

  
  export default CreateFolder;