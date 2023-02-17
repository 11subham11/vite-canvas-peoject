import React from "react";
import GridLayout from "react-grid-layout";

const Canvas = ({ layout, components, handleLayoutChange }) => {
  return (
    <>
      <GridLayout
        className="layout"
        layout={layout}
        cols={layout.cols}
        rowHeight={30}
        width={1200}
        onLayoutChange={handleLayoutChange}
      >
        {components.map((component) => (
          <div key={component.i}>{component.content}</div>
        ))}
      </GridLayout>
    </>
  );
};

export default Canvas;
