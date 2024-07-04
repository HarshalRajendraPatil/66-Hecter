import React from "react";

const CheckBoxForFilters = ({ title, name, checked, handleCheckboxChange }) => {
  return (
    <div className="mb-4">
      <label className="inline-flex items-center">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={handleCheckboxChange}
          className="form-checkbox text-gold"
        />
        <span className="ml-2">{title}</span>
      </label>
    </div>
  );
};

export default CheckBoxForFilters;
