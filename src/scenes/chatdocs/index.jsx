import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

import { Box, IconButton, useTheme, TextField } from "@mui/material";
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import Fileupload from "./Fileupload";
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
            <article className="bg-black p-8 mr-4 rounded-xl ">
                <h3 className="text-center">Documents</h3>
            </article>
            <article className="bg-black p-8 mr-4 rounded-xl">
                <h3 className="text-center">Images</h3>
            </article>
            <article className="bg-black p-8 mr-4 rounded-xl">
                <h3 className="text-center">Audio</h3>
            </article>
            <article className="bg-black p-8 mr-4 rounded-xl">
                <h3 className="text-center">Video</h3>
            </article>
        </div>

        <div className="mt-20">
            <h2>Documents</h2>
            <section className="display: grid grid-cols-5">
                <article>Book1</article>
                <article>Book2</article>

            </section>
        </div>
    </div>
        
        
        
        
    )

}
        
        
        
        
        
        
        
        


export default Chatdoc