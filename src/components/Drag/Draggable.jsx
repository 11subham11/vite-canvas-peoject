import React from "react";
import { useDrag } from "react-dnd";

// this will wrap the element we need to make draggable from the left Siderbar
const Draggable = ({ type, element }) => {
  const [{ isDragging }, drag] = useDrag({
    type,
    item: { type }, // we can say it as an identifier here for the element
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }), //listens state of drag
  });

  return (
    <>
      <div
        ref={drag}
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: "move",
        }}
      >
        {element}
      </div>
    </>
  );
};

export default Draggable;
