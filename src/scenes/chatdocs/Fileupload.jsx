import axios from 'axios'

const Fileupload = (event)=>{
   const file = event.target.files[0];
   const formData = new FormData;
   formData.append('file', file);

   axios({
    // Endpoint to send files
    url: "http://127.0.0.1:8000/upload",
    method: "POST",
    headers: {
        // Add any auth token here
        authorization: "your token comes here",
    },

    // Attaching the form data
    data: formData,
})
    // Handle the response from backend here
    .then((res) => {
        console.log(res)
    })

    // Catch errors if any
    .catch((err) => {
        console.error(err);
    });

   /* axios.post('/upload', formData)
   .then(response => {
     console.log(response);
   })
   .catch(error => {
     console.error(error);
   });
   alert("Yoh file uploaded!");  */

   /* fetch("/upload", {
    method:'POST',
    body: FormData
   })
   .then(response => response.json)
   .then(data => console.log(data))
   .catch(err => console.log(err))
    alert("Yoh file uploaded!"); */
}

export default Fileupload