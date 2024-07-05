import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../../components/Loading";
import FormTextField from "../../../components/FormTextField";
import FormBtnSubmit from "../../../components/FormBtnSubmit";
import FormFileUpload from "../../../components/FormFileUpload";
import PostActionButton from "../../../components/PostActionButton";
import CloseIcon from "../../../components/Icons/CloseIcon";

function PostModal({ userId, display }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    userId: userId,
    caption: "",
    works: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevFormData) => ({
      ...prevFormData,
      works: files,
    }));
  };

  useEffect(() => {
    console.log("Updated formData: ", formData.works);
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData();
    form.append("userId", formData.userId);
    form.append("caption", formData.caption);
    formData.works.forEach((file, index) => {
      form.append(`works[${index}]`, file);
    });

    try {
      const response = await axios.post(apiUrl + "/post", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess(true);
      console.log("Form submitted successfully:", response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      console.error("Error submitting form:", err);
    } finally {
      setLoading(false);
      console.log("finally");
    }
  };

  return (
    <>
      {loading && <Loading />}
      <div className={`modal ${display}`}>
        <form
          className="modal-form bg-white p-5 max-w-96 m-auto mt-40 rounded-md relative"
          onSubmit={handleSubmit}
        >
          <div className="absolute right-3 top-3">
            <PostActionButton IconComponent={CloseIcon} isDisabled={false} />
          </div>
          <center className="font-bold text-2xl">Upload</center>
          <FormTextField
            type={"text"}
            label={"Caption"}
            name={"caption"}
            value={formData.caption}
            onChange={handleChange}
          />
          <FormFileUpload label={"Images"} onChange={handleFileUpload} />
          <FormBtnSubmit label={"Upload"} />
          {error && <div className="text-red-500 mt-2">{error}</div>}
          {success && (
            <div className="text-green-500 mt-2">Submitted successfully!</div>
          )}
        </form>
      </div>
    </>
  );
}

export default PostModal;
