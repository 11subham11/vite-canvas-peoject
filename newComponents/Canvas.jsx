import React from 'react'
import GridLayout from "react-grid-layout";

const Canvas = ({ gridItems }) => {
  return (
    <GridLayout
      className="layout"
      layout={gridItems}
      cols={12}
      rowHeight={30}
      width={1200}
    >
      {gridItems.map((item) => (
        <div key={item.i}>{item.child}</div>
      ))}
    </GridLayout>
  )
}

export default Canvas