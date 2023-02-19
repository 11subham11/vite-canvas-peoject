import React, { useState } from "react";
import "./App.css";

import InputElements from "./components/InputElements";

import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

function App() {
  const [layout, setLayout] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleDrop = (layout, item, e) => {
    console.log("dropped something");
    setLayout([
      ...layout,
      {
        i: uuidv4(),
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h,
        type: item.type,
        props: {},
      },
    ]);
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handleUpdateProps = (props) => {
    setLayout(
      layout.map((item) => {
        if (item.i === selectedItem.i) {
          return {
            ...item,
            props: { ...item.props, ...props },
          };
        } else {
          return item;
        }
      })
    );
  };

  const renderInput = (item) => {
    switch (item.type) {
      case "text-input":
        return <input type="text" key={item.i} />;
      case "file-upload":
        return <input type="image" key={item.i} />;
      case "image-upload":
        return <input type="file" key={item.i} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex-1 flex overflow-hidden">
          <div className="w-64 flex-none">
            <InputElements />
          </div>
          <div className="flex-1 bg-gray-200">
            {/* canvas */}
            <ResponsiveGridLayout
              className="layout"
              breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
              cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
              rowHeight={50}
              onDrop={(layout, item, e) => handleDrop(layout, item, e)}
              onDragOver={handleDragOver}
              isResizable
              isDraggable
            >
              {layout.map((item) => (
                <div key={item.i} onClick={() => handleSelectItem(item)}>
                  {renderInput(item)}
                </div>
              ))}
            </ResponsiveGridLayout>
          </div>
          <div className="w-64 flex-none">
            {selectedItem && (
              <PropertiesWindow
                selectedItem={selectedItem}
                onUpdateProps={handleUpdateProps}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
