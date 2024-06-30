import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

import { useState } from "react";

import { Box, IconButton, useTheme, TextField } from "@mui/material";
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import Fileupload from "./Fileupload";
//import ShowFiles from "./files/showFiles";
import App from "./files/showFiles";
import ShowImagesContainer from "./files/showImages";
import Displaydocs from "./files/Displaydocums";
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
  
  

const Chatdoc = () =>{
    const [docclicked, setdocClicked] = useState(true);
    const [imageClick, setimageClicked] = useState(false);
    const [VideoClick, setvideoClicked] = useState(false);
    const [audioClick, setaudioClicked] = useState(false);

    //let targetElement = ''

    const handledocClick = (e) => {
        setdocClicked(true);
        setimageClicked(true);
        setvideoClicked(false);
        setaudioClicked(false);
    
        //targetElement = e.target.id;  
        //let displayDocs = document.querySelector(".display__docs");
        
        //displayDocs.style.visibility=='hidden'? displayDocs.style.visibility='visible': displayDocs.style.visibility='hidden'
         //document.getElementById('display-docs').style.visibility = 'hidden';
      }
    const handleImageClick = (e) => {
        setimageClicked(true);
        setdocClicked(false);
        setvideoClicked(false);
        setaudioClicked(false);
    
         
      }
    
    const handleAudioClick = (e) => {
        setaudioClicked(true);
        setimageClicked(false);
        setdocClicked(false);
        setvideoClicked(false);
    
         
      }
    const handleVideoClick = (e) => {
        setvideoClicked(true);
        setimageClicked(false);
        setdocClicked(false);
        setaudioClicked(false);
    
         
      }


    
    
    return (
        
        <div>
        <h2 className="text-center" >This is the chatdoc</h2>
        <div className="bg-blue-500 text-white p-4 display: flex justify-between">
            <article>
                <h2 variant="h2">This is the heading</h2>
            </article>
            <article>
                <form>
                <Button
  component="label"
  role={undefined}
  variant="contained"
  tabIndex={-1}
  startIcon={<CloudUploadIcon />}
  onChange={(event)=>Fileupload(event)}
>
  Upload file
  <VisuallyHiddenInput type="file" />
</Button>

                </form>
                

                
            </article>
            
        </div>
        <div>
            <article className="display: flex justify-between bg-green-500">
            <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
            <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
            </article>
        </div>
        <div className="display: grid grid-cols-4 mt-20">
            <article className="bg-black p-8 mr-4 rounded-xl " id="documents" onClick={handledocClick}>
                <h3 className="text-center">Documents</h3>
            </article>
            <article className="bg-black p-8 mr-4 rounded-xl" id="images" onClick={handleImageClick}>
                <h3 className="text-center">Images</h3>
            </article>
            <article className="bg-black p-8 mr-4 rounded-xl" id="audio" onClick={handleAudioClick}>
                <h3 className="text-center">Audio</h3>
            </article>
            <article className="bg-black p-8 mr-4 rounded-xl" id="video"  onClick={handleVideoClick}>
                <h3 className="text-center">Video</h3>
            </article>
        </div>

        <div className="mt-20" id="display_files">
            {docclicked == true ? <div>
                <h2 className="text-center">Documents</h2>
            <section >
                
                <div className="display__docs">
                <App />
                

                </div></section> </div>: imageClick == true ? <div>
                <h2 className="text-center">Images</h2>
            <section >
                
                <div className="display__docs">
                <ShowImagesContainer />
                

                </div></section> </div>: VideoClick == true ? <div>
                <h2 className="text-center">Video</h2>
            <section >
                
                <div className="display__docs">
                <App />
                

                </div></section> </div>:
                
                audioClick == true ? <div>
                <h2 className="text-center">Audio</h2>
            <section >
                
                <div className="display__docs">
                <App />
                

                </div></section> </div>:<div><h2>Yoh</h2></div>}
 
        {/* {targetElement == 'documents' ? <div>
                <h2>Documents</h2>
            <section className="display: grid grid-cols-5">
                <article>Book1</article>
                <article>Book2</article>
                <div className="display__docs">
                <App />
                

                </div>
                  
                

            </section>
            </div>: targetElement == 'images'? <div></div>: targetElement == 'audio'?
             <div></div>: targetElement == 'video'? <div></div>: <div><h2>Hello!</h2></div>} */}

        </div>
    </div>
        
        
        
        
    )

}
        
        
        
        
        
        
        
        


export default Chatdoc