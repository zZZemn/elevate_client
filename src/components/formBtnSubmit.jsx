function FormBtnSubmit({ label }) {
  return (
    <>
      <div className="w-full max-w-sm flex justify-end mt-3">
        <button className=" bg-black text-white px-4 py-2 rounded-lg">
          {label}
        </button>
      </div>
    </>
  );
}
export default FormBtnSubmit;
