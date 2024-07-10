import { dividerClasses } from "@mui/material"
import { useEffect,useState } from "react";
import axios from "axios";


const FetchfolderDetails = (props)=>{
    //console.log(props.FolderName);
    const [files, setFiles] = useState(false);
    let folderName = props.FolderName.toLowerCase();
    
    
    useEffect(()=>{

        const fetchFiles = async()=>{
            
            try {
            const response = await axios.get(`http://localhost:8000/files/${folderName}`);
            //const data = await response.json();
           // console.log(response.data[0].filename);
           setFiles(response.data[1].filename)

           //return response.data[0].filename;
           
            
            
            } catch (error) {
                console.error('Error fetching PDF:', error);
                
            }

        }
        

     fetchFiles();
        

    },[])


    return (<div>
        <h2>These are the files received!</h2>
        {files ? <div>
            <h2>{files}</h2>
        </div>: <div>
            <h2>Loading....</h2></div>}
    </div>)
}

export default FetchfolderDetails;