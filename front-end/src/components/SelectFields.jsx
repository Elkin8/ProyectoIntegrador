import React from "react";

const SelectField = ({ name, value, onChange, options }) => {
  return (
    <select class="form-control" aria-describedby="emailHelp" name={name} value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectField;

