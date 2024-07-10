// MyDocument.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
//const pdf = new PDFDocument({ autoFirstPage: false });

const MyDocument = ({file}) => {
    
  const styling = StyleSheet.create({
    page: {
      backgroundColor: 'white',
    },
    section: {
      margin: 20,
      fontSize: '16pt',
    },
  });

  const pdfContent = file.data;

  return (
    <Document>
<Document>
      <Page style={styling.page}>
        {/* Display your PDF content */}
        <div style={styling.section}>{pdfContent}</div>
      </Page>
    </Document>
    </Document>
  );
};

export default MyDocument;
