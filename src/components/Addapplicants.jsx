import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { app, storage } from "../config/firebase";

const Addapplicants = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const HandleImage = async (e) => {
    const files = e.target.files[0];
    if (files) {
      setImageFile(files);
      setImageFileUrl(URL.createObjectURL(files));
    }
  };

  const uploadImage = async () => {
    const storageRef = ref(storage, new Date().getTime() + imageFile.name);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setLoading(progress < 100);
      },
      (error) => {
        console.error("Error uploading image:", error);
        setLoading(false);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setImageFileUrl(downloadURL);
          setUploadCompleted(true);
          setLoading(false);
        } catch (error) {
          console.error("Error getting download URL:", error);
          setLoading(false);
        }
      }
    );
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      mobileNo: "",
      email: "",
      department: "",
      joining: "",
      reporting: "",
      expirience: "",
      salary: "",
      linkedin: "",
      image: "",
    },
    validate: (values) => {},
    onSubmit: async (values, formikbag) => {
      try {
        setLoading(true);
        if (uploadCompleted) {
          values.image = imageFileUrl;
          await axios.post("", values);
          formikbag.resetForm();
          alert("Data created successfully");
          navigate("/dashboard");
        } else {
          console.error("Image upload not completed yet");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <Header />
      <div className="container margin-top">
        <h3 className="text-center mt-5">Add Applicants</h3>
        <div className="shadow-lg p-4 rounded">
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-lg-4">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                <span className="text-danger">{formik.errors.name}</span>
              </div>
              <div className="col-lg-4">
                <label htmlFor="mobileNo">Mobile No</label>
                <input
                  type="tel"
                  className="form-control"
                  id="mobileNo"
                  name="mobileNo"
                  value={formik.values.mobileNo}
                  onChange={formik.handleChange}
                />
                <span className="text-danger">{formik.errors.mobileNo}</span>
              </div>
              <div className="col-lg-4">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                <span className="text-danger">{formik.errors.email}</span>
              </div>
              <div className="col-lg-4 mt-5">
                <label htmlFor="gender">department</label>
                <input
                  type="text"
                  className="form-control"
                  id="department"
                  name="department"
                  value={formik.values.department}
                  onChange={formik.handleChange}
                />
                <span className="text-danger">{formik.errors.department}</span>
              </div>

              <div className="col-lg-4">
                <label>joining</label>
                <div className="form-check">
                  <input
                    type="date"
                    className="form-check-input"
                    id="joining"
                    name="joining"
                    checked={formik.values.joining}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <label>reporting</label>
                <div className="form-check">
                  <input
                    type="text"
                    className="form-check-input"
                    id="reporting"
                    name="reporting"
                    checked={formik.values.reporting}
                    onChange={formik.handleChange}
                  />
                </div>

                <span className="text-danger">{formik.errors.reporting}</span>
              </div>

              <div className="col-lg-4">
                <label>expirience</label>
                <div className="form-check">
                  <input
                    type="number"
                    className="form-check-input"
                    id="expirience"
                    name="expirience"
                    checked={formik.values.expirience}
                    onChange={formik.handleChange}
                  />
                </div>
                <span className="text-danger">{formik.errors.expirience}</span>
              </div>

              <div className="col-lg-4">
                <label>Salary</label>
                <div className="form-check">
                  <input
                    type="number"
                    className="form-check-input"
                    id="Salary"
                    name="Salary"
                    checked={formik.values.Salary}
                    onChange={formik.handleChange}
                  />
                </div>
                <span className="text-danger">{formik.errors.Salary}</span>
              </div>

              <div className="col-lg-4">
                <label>linkedin</label>
                <div className="form-check">
                  <input
                    type="text"
                    className="form-check-input"
                    id="linkedin"
                    name="linkedin"
                    checked={formik.values.linkedin}
                    onChange={formik.handleChange}
                  />
                </div>
                <span className="text-danger">{formik.errors.linkedin}</span>
              </div>

              <div className="col-lg-4">
                <label>Image</label>
                <input
                  type="file"
                  className="form-control"
                  name="image"
                  a
                  accept="image/"
                  onChange={HandleImage}
                />
              </div>
              <div className="col-lg-12 mt-5">
                <button type="submit" className="btn btn-primary">
                  {loading ? "Loading..." : "Submit"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Addapplicants;
