import React from "react";

function FormSelect({ label, name, value, professions, onChange }) {
  return (
    <div className="relative w-full max-w-sm mt-3">
      <label className="absolute font-bold p-1 px-2 text-xs text-gray-600">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full max-w-sm border border-gray-900 rounded-lg p-2 pt-4 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        style={{ fontSize: "14px" }}
      >
        <option disabled value="">
          Please select a profession
        </option>
        {professions &&
          professions.map((profession) => (
            <option value={profession.profession} key={profession._id}>
              {profession.profession}
            </option>
          ))}
      </select>
    </div>
  );
}

export default FormSelect;
