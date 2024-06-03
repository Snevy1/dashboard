//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
//import Sidebardash from './global/sidebar'
//import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Sidebardash from './global/sidebar';
import Topbar from './global/bar';
import { Link } from 'react-router-dom';
import { useState } from "react";
import Chatdoc from './scenes/chatdocs'
import Dashboard from './scenes/dashboard';
import FAQ from './scenes/FAQ';
import Videochat from './scenes/videochat';
import Websummary from './scenes/websummary';
import Calender from './scenes/calender';
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Document from './scenes/document';


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
 
  return (
    <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className='app'>
      <Sidebardash  isSidebar={isSidebar} />
      <main className='content'>
        <Topbar  setIsSidebar={setIsSidebar}/>
      <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/chatdoc" element={<Chatdoc/>} />
              <Route path="/websummary" element={<Websummary />} />
              <Route path="/videosummary" element={<Videochat />} />
              <Route path="/calender" element={<Calender />} />
              <Route path="/document" element={<Document />} />
              <Route path="/faq" element={<FAQ/>} />
              {/* <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} /> */}
            </Routes>

      </main>
    </div>

            </ThemeProvider>

      </ColorModeContext.Provider >
    
   
  )
}

export default App
