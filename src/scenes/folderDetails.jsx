import { dividerClasses } from "@mui/material"
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useEffect,useState } from "react";
import axios from "axios";
import { styled } from '@mui/material/styles';

import Fileupload from "./chatdocs/Fileupload";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });


const FetchfolderDetails = (props)=>{
    //console.log(props.FolderName);
    const [files, setFiles] = useState(false);
    let folderName = props.FolderName.toLowerCase();
    
    
    useEffect(()=>{

        const fetchFiles = async()=>{
            
            try {
            const response = await axios.get(`http://localhost:8000/files/folder/${folderName}`);
            
            console.log(response.data);
           setFiles(response.data);

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
            {files.map((file)=>{
              return   <h2 key={file.filename}>{file.filename}</h2>

            })}
        </div>: <div>
            <h2>Loading....</h2></div>}
    </div>)
}

export default FetchfolderDetails;


{/* <form>
                <Button
  component="label"
  role={undefined}
  variant="contained"
  tabIndex={-1}
  startIcon={<CloudUploadIcon />}
  onChange={(event,folderName)=>Fileupload(event,folderName)}
>
  Upload file
  <VisuallyHiddenInput type="file" />
</Button>

                </form> */}