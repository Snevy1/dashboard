 import axios from "axios"
 import { useState , useEffect} from "react"
 import FolderIcon from '@mui/icons-material/Folder';
import FetchfolderDetails from "./folderDetails";
const Fetchfolders = ()=>{
    const [folders, setFolders] = useState(false);
    const [viewFolder,setViewFolder] = useState(false);
    const [folderName, setFolderName] = useState("");

    useEffect(()=>{
        const FetchFolders = async()=>{
            const response = await axios.get("http://127.0.0.1:8000/folders");
            setFolders(response.data);
            
        }

        FetchFolders();

    }, []);
    const handleViewFolder = (folderName)=>{
        setViewFolder(true);
        setFolderName(folderName);
    }
     
    return (<div>

{ folders && !viewFolder ? 
        <div className="grid grid-cols-4 gap-5">
        {folders.map((folder)=>{
            return(
                    <div key={folder.name}>
                <FolderIcon   color="secondary" fontSize="large"  onClick={()=>handleViewFolder(folder.name)} />
                    <h2>{folder.name}</h2>


                </div>)

        })}

</div>:
 viewFolder ? 
 <div>
    <FetchfolderDetails FolderName={folderName}/>
    <h2>{folderName}</h2>

        
    </div>:
    <div> <h2>No files</h2></div>

        }
        </div>)


    
}

export default Fetchfolders;