import React from "react";

const InputsForFilters = ({ title, type, name, value, handleInputChange }) => {
  return (
    <div className="mb-4">
      <label className="block mb-1">{title}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-200 rounded"
      />
    </div>
  );
};

export default InputsForFilters;
