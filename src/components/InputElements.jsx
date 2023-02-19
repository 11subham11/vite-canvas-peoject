import React from 'react';
import { FaRegEnvelope, FaRegFileAlt, FaRegImage } from 'react-icons/fa';


const InputElements = () => {

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
    console.log('hello');
  };

  return (
    <>
   <div className="w-64 px-4 py-6 bg-gray-100 text-gray-900">
      <h3 className="text-lg font-semibold mb-4">Input Elements</h3>
      <ul className="space-y-2">
        <li className="flex items-center space-x-2 cursor-move" draggable onDragStart={(e) => handleDragStart(e, 'text-input')}>
          <FaRegEnvelope />
          <span>Text Input</span>
        </li>
        <li className="flex items-center space-x-2 cursor-move" draggable onDragStart={(e) => handleDragStart(e, 'file-upload')}>
          <FaRegFileAlt />
          <span>File Upload</span>
        </li>
        <li className="flex items-center space-x-2 cursor-move" draggable onDragStart={(e) => handleDragStart(e, 'image-upload')}>
          <FaRegImage />
          <span>Image Upload</span>
        </li>
      </ul>
    </div>
    </>
  )
}

export default InputElements