import React from 'react'
import Draggable from './Draggable'

const elements = [
    { type: 'text', element: <input type="text" placeholder="Text input" /> },
    { type: 'textarea', element: <textarea placeholder="Textarea" /> },
    { type: 'checkbox', element: <input type="checkbox" /> },
    { type: 'radio', element: <input type="radio" /> },
] 

const DraggableList = () => {
  return (
   <>
    <div>
      {elements.map(({ type, element }) => ( 
        //{type , element} destructures the particular object
        <Draggable key={type} type={type} element={element} />
      ))}
    </div>
   </>
  )
}

export default DraggableList