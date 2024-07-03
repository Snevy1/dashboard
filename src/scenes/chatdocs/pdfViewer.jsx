import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

export const PdfViewer = ({ filename }) => {
  const [fileUrl, setFileUrl] = useState('');

  useEffect(() => {
    const fetchFile = async () => {
      const response = await axios.get(`/files/${filename}`, { responseType: 'blob' });
      const file = new Blob([response.data], { type: 'application/pdf' });
      setFileUrl(URL.createObjectURL(file));
    };
    fetchFile();
  }, [filename]);
  

  return (
    <div>
      {/* {fileUrl && (
        <Document file={fileUrl}>
          <Page pageNumber={1} />
        </Document>
      )} */}

     {fileUrl && <Viewer fileUrl={fileUrl} />}
    </div>
  );
};
