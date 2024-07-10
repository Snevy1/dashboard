import React, { useState, useEffect } from 'react';
//import ReactPDF from '@react-pdf/renderer';

import axios from 'axios';
//import { Viewer } from '@react-pdf-viewer/core';
//import '@react-pdf-viewer/core/lib/styles/index.css';

//import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import {PDFViewer, PDFDownloadLink} from '@react-pdf/renderer';
import MyDocument from './files/MyDocument';


 const Pdf = ({ filename }) => {
  const [fileUrl, setFileUrl] = useState('');
  

  /* useEffect(() => {
    const fetchFile = async () => {
      const response = await axios.get(`/files/${filename}`, { responseType: 'blob' });
      const file = new Blob([response.data], { type: 'application/pdf' });
      //console.log(file);
      setFileUrl(URL.createObjectURL(file));
    };
    fetchFile();
  }, [filename]);
  
 */

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await axios.get(`/files/${filename}`, { responseType: 'arraybuffer' });
        const pdfData = new Uint8Array(response.data);
        const base64Pdf = btoa(String.fromCharCode(...pdfData));
        setFileUrl(`data:application/pdf;base64,${base64Pdf}`);
      } catch (error) {
        console.error('Error fetching PDF:', error);
      }
    };
    fetchFile();
  }, [filename]);
  
  return (
    <div>
{fileUrl && (
        <PDFViewer>
          <MyDocument file={{ data: fileUrl }} />
        </PDFViewer>
    
  )};
  </div>)

};

//ReactPDF.render(<Pdf />, `http://localhost:8000/files/Invoice_EUINKE24_27831.pdf`);

export default Pdf;
