function Alert({ alertType, alertTitle, alertMessage }) {
  const alertClasses = {
    danger: "bg-red-100 border-l-4 border-red-500 text-red-700",
    warning: "bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700",
    success: "bg-green-100 border-l-4 border-green-500 text-green-700",
    info: "bg-blue-100 border-l-4 border-blue-500 text-blue-700",
  };

  const alertClass = alertClasses[alertType] || alertClasses.info;

  return (
    <>
      <div
        className={`alert-component ${alertClass} p-3 rounded-sm text-md absolute right-0 top-0 m-2 opacity-70 pointer-events-none`}
        role="alert"
      >
        <p className="font-bold">{alertTitle}</p>
        <p>{alertMessage}</p>
      </div>
    </>
  );
}

export default Alert;
