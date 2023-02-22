import React, { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./App.css";

import { Formik, Form, Field } from "formik";

const ResponsiveGridLayout = WidthProvider(Responsive);

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [userName , setUserName] = useState(null)
  const [edit, setEdit] = useState(false);
  const [inputElements, setInputElements] = useState([
    {
      id: 1,
      type: "text",
      inputId: "text",
      name: "text",
      placeholder: "text",
      label: "Text",
    },
  ]);
  const [values, setValues] = useState({});
  const [layout, setLayout] = useState([]);

  const handleDragElement = (event, item) => {
    event.dataTransfer.setData("text/plain", item.id);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const id = parseInt(event.dataTransfer.getData("text/plain"));
    const input = inputElements.find((element) => element.id === id);
    const inputId = Math.random().toString();
    if (input) {
      setLayout([
        ...layout,
        {
          i: inputId,
          x: 0,
          y: Infinity,
          w: 2,
          h: 2,
          ...input,
        },
      ]);
      setSelectedItem({
        i: inputId,
        x: 0,
        y: Infinity,
        w: 2,
        h: 2,
        ...input,
      });
    }
  };

  const handleDeleteInput = (selectedItem) => {
    console.log(selectedItem.i);
    const index = layout.findIndex((element) => element.i === selectedItem.i);
    layout.splice(index, 1);
    setSelectedItem(null);
  };

  const handleEditInput = () => {
    console.log(values.i);
    const index = layout.findIndex((element) => element.i === values.i);
    console.log("gg", index);
    layout[index] = values;
    console.log(layout);
  };

  return (
    <>
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
        <div className="w-3/5 flex flex-col h-screen">
          <div className="bg-gray-900 h-14 flex justify-center items-center">
            {layout && layout.length > 0 ? (
              <button className="bg-green-600 px-4 py-2 rounded hover:bg-green-800">
                Save
              </button>
            ) : <h1>Drop elements to render</h1>}
          </div>
          <div
            className="bg-gray-200 p-4 overflow-x-hidden h-full"
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDrop}
          >
            <ResponsiveGridLayout
              className="layout"
              breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
              cols={{ lg: 2, md: 2, sm: 2, xs: 1, xxs: 1 }}
              rowHeight={200}
              draggableHandle=".drag-handle"
            >
              {layout &&
                layout.map((item) => {
                  return (
                    <div
                      key={item.i}
                      className="bg-gray-900 p-4 shadow cursor-move"
                      onClick={() => {
                        setSelectedItem(item);
                      }}
                    >
                      <div className="drag-handle">☰</div>
                      <div className="p-4 flex rounded">
                        <div className="mb-2 flex flex-col justify-center">
                          <label
                            htmlFor="label"
                            className="font-bold text-gray-200 mb-2"
                          >
                            {item.label}:
                          </label>
                          <input
                            type={item.type}
                            id={item.inputId}
                            name={item.name}
                            placeholder={item.placeholder}
                            className="w-full border border-gray-400 rounded py-1 px-2"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </ResponsiveGridLayout>
          </div>
        </div>
        <div className="w-1/5 h-screen bg-gray-900 p-4">
          {selectedItem && (
            <div>
              <h2 className="text-lg font-bold mb-4">
                {selectedItem.label} Properties
              </h2>
              {edit === false ? (
                <div className="">
                  <p>Input Id: {selectedItem.i}</p>
                  <p>Label: {selectedItem.label}</p>
                  <p>Name: {selectedItem.name}</p>
                  <p>Type: {selectedItem.type}</p>
                  <p>Placeholder: {selectedItem.placeholder}</p>
                </div>
              ) : (
                <Formik
                  enableReinitialize
                  innerRef={(formikActions) =>
                    formikActions
                      ? setValues(formikActions.values)
                      : setValues({})
                  }
                  initialValues={{
                    ...selectedItem,
                  }}
                  //Form Data Submit Fun..
                  onSubmit={(values) => {
                    console.log(values);
                  }}
                >
                  <Form>
                    {/* Label Field */}
                    <div className="relative w-full mb-5 text-gray-900">
                      <h3 className="block uppercase text-gray-300 text-xs font-bold mb-2">
                        Label
                      </h3>
                      <Field
                        className="border-0 px-2 py-2 placeholder-[#000]/50 text[#000]/50 bg-slate-50 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        id="label"
                        name="label"
                        type="text"
                        // autoComplete="off"
                        placeholder="Label"
                      />
                    </div>
                    {/* Name Field */}
                    <div className="relative w-full mb-5 text-gray-900">
                      <h3 className="block uppercase text-gray-300 text-xs font-bold mb-2">
                        Name
                      </h3>
                      <Field
                        className="border-0 px-2 py-2 placeholder-[#000]/50 text[#000]/50 bg-slate-50 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        id="name"
                        name="name"
                        type="text"
                        // autoComplete="off"
                        placeholder="name"
                      />
                    </div>
                    {/* Type Field */}
                    <div className="relative w-full mb-5 text-gray-900">
                      <h3 className="block uppercase text-gray-300 text-xs font-bold mb-2">
                        Type
                      </h3>
                      <Field
                        className="border-0 px-2 py-2 placeholder-[#000]/50 text[#000]/50 bg-slate-50 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        id="type"
                        name="type"
                        type="text"
                        // autoComplete="off"
                        placeholder="type"
                      />
                    </div>
                    {/* Placeholder Field */}
                    <div className="relative w-full mb-5 text-gray-900">
                      <h3 className="block uppercase text-gray-300 text-xs font-bold mb-2">
                        Placeholder
                      </h3>
                      <Field
                        className="border-0 px-2 py-2 placeholder-[#000]/50 text[#000]/50 bg-slate-50 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        id="placeholder"
                        name="placeholder"
                        type="text"
                        // autoComplete="off"
                        placeholder="placeholder"
                      />
                    </div>
                  </Form>
                </Formik>
              )}

              <div className="mt-4 flex flex-row gap-2">
                {edit === false ? (
                  <button
                    onClick={() => {
                      setEdit(true);
                    }}
                    className="bg-green-600 px-4 py-2 rounded hover:bg-green-800"
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEdit(false);
                      handleEditInput(true);
                    }}
                    className="bg-green-600 px-4 py-2 rounded hover:bg-green-800"
                  >
                    Save
                  </button>
                )}

                <button
                  onClick={() => {
                    handleDeleteInput(selectedItem);
                  }}
                  className="bg-red-600 px-4 py-2 rounded hover:bg-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
