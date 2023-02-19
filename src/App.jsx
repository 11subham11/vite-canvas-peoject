import React, { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./App.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [inputElements, setInputElements] = useState([
    { id: 1, type: "text", label: "Text Input" },
    { id: 2, type: "checkbox", label: "Checkbox" },
    { id: 3, type: "radio", label: "Radio Button" },
  ]);
  const [layout, setLayout] = useState([]);
  console.log("layout" , layout);

  const handleDragElement = (event, item) => {
    event.dataTransfer.setData("text/plain", item.id);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const id = parseInt(event.dataTransfer.getData("text/plain"));
    const input = inputElements.find((element) => element.id === id);
    if (input) {
      setLayout([
        ...layout,
        {
          i: Math.random().toString(),
          x: 0,
          y: Infinity,
          w: 2,
          h: 2,
          ...input,
        },
      ]);
    }
  };

  return (
    <div className="flex">
      <div className="w-1/5 h-screen bg-gray-900 p-4">
        <h2 className="text-lg font-bold mb-4">Input Elements</h2>
        {inputElements.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded shadow text-gray-900 mb-4 cursor-move"
            draggable
            onDragStart={(event) => handleDragElement(event, item)}
          >
            {item.label}
          </div>
        ))}
      </div>
      <div
        className="w-3/5 h-screen bg-gray-900 p-4"
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
      >
        <ResponsiveGridLayout
          className="layout"
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={100}
          draggableHandle=".drag-handle"
        >
          {layout && layout.map((item) => {
            return (
              <div key={item.i} className="bg-gray-200 p-4 shadow cursor-move">
                <div className="drag-handle">☰</div>
                  <div className="p-4 bg-white rounded shadow">
                    <h3 className="font-bold text-gray-200 mb-2">{item.label}</h3>
                    <div className="mb-2">
                      <label htmlFor="label">Label</label>
                      <input
                        type="text"
                        id="label"
                        name="label"
                        className="w-full border border-gray-400 rounded py-1 px-2"
                        value={selectedItem.label}
                        onChange={(e) =>
                          setSelectedItem({
                            ...selectedItem,
                            label: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
              </div>
            );
          })}
        </ResponsiveGridLayout>
      </div>
      <div className="w-1/5 h-screen bg-gray-200 p-4">
        {selectedItem && (
          <div>
            <h2 className="text-lg font-bold mb-4">
              {selectedItem.label} Properties
            </h2>
            <p>Type: {selectedItem.type}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
