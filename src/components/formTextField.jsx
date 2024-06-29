function FormTextField({ type, label, name, value, onChange }) {
  return (
    <>
      <div className="relative w-full max-w-sm mt-3">
        <label
          className="absolute font-extrabold p-1 px-2"
          style={{ fontSize: "10px" }}
        >
          {label}
        </label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full max-w-sm border border-gray-900 rounded-lg p-2 pt-4 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          style={{ fontSize: "14px" }}
        />
      </div>
    </>
  );
}
export default FormTextField;
