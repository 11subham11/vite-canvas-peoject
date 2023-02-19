import React, { useState } from "react";
import "./App.css";
import Canvas from "./components/Canvas";
import Sidebar from "./components/Sidebar";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const [layout, setLayout] = useState({ cols: 12, rows: [] });
  const [components, setComponents] = useState([]);

  const handleLayoutChange = (newLayout) => {
    setLayout(newLayout);
  };

  return (
    <>
      <div>
        <DndProvider backend={HTML5Backend}>
          <Sidebar />
          <Canvas
            layout={layout}
            components={components}
            onLayoutChange={handleLayoutChange}
          />
        </DndProvider>
      </div>
    </>
  );
}

export default App;
