function FormFileUpload({ label, onChange }) {
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
          type="file"
          multiple
          onChange={onChange}
          className="w-full max-w-sm border border-gray-900 rounded-lg p-2 pt-6 bg-white text-gray-700 placeholder-gray-400"
        />
      </div>
    </>
  );
}

export default FormFileUpload;
