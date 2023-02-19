import React, { useState } from 'react';

const PropertiesWindow = ({ selectedItem, onUpdateProps }) => {
  const [updatedProps, setUpdatedProps] = useState(selectedItem.props);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedProps((prevProps) => ({ ...prevProps, [name]: value }));
  };

  const handleUpdate = () => {
    onUpdateProps(selectedItem.i, updatedProps);
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">{selectedItem.type} Properties</h2>
      {Object.entries(updatedProps).map(([key, value]) => (
        <div key={key} className="mb-4">
          <label className="block font-bold mb-2">{key}</label>
          <input
            className="border rounded py-2 px-3"
            type="text"
            name={key}
            value={value}
            onChange={handleInputChange}
          />
        </div>
      ))}
      <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default PropertiesWindow;
