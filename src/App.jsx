import React, { useState } from 'react'
import './App.css'
import Canvas from './components/Canvas'
import Sidebar from './components/Sidebar';

function App() {

  const [layout, setLayout] = useState({ cols: 12, rows: [] });
  const [components, setComponents] = useState([]);

  const handleLayoutChange = newLayout => {
    setLayout(newLayout);
  };

  return (
   <>
   <div>
    <Sidebar />
    <Canvas layout={layout} components={components} onLayoutChange={handleLayoutChange}/>
   </div>
   </>
  )
}

export default App
