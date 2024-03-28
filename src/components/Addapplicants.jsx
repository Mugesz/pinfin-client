import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../config/firebase";
import { config } from "../Api";
import SuccessModal from "./SuccessModel";
import Header from "./Header";


const Addapplicants = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reportingperson, setReportingperson] = useState([]);
  const [showModal, setShowModal] = useState(false); 

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
      expirience:"",
      salary: "",
      linkedin: "",
      image: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.name) {
        errors.name = "Name is mandatory";
      }

      if (!values.mobileNo) {
        errors.mobileNo = "Mobile number is mandatory";
      } else if (!/^\d{10}$/.test(values.mobileNo)) {
        errors.mobileNo = "Invalid mobile number";
      }

      if (!values.email) {
        errors.email = "Email is mandatory";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = "Invalid email address";
      }

      if (!values.department) {
        errors.department = "Department is mandatory";
      }

      if (!values.joining) {
        errors.joining = "Date is mandatory";
      }

      if (!values.reporting) {
        errors.reporting = "Reporting is mandatory";
      }

      if (!values.expirience) {
        errors.expirience = "Experience is mandatory";
      }

      if (!values.salary) {
        errors.salary = "Salary is mandatory";
      }

      if (!values.linkedin) {
        errors.linkedin = "LinkedIn is mandatory";
      }

      return errors;
    },
    onSubmit: async (values, formikbag) => {
      try {
        setLoading(true);
        if (uploadCompleted) {
          values.image = imageFileUrl;
          await axios.post(`${config.Api}/api/create`, values);
          formikbag.resetForm();
          setShowModal(true); 
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

  useEffect(() => {
    const reporting = async () => {
      try {
        const response = await axios.get(`${config.Api}/report/getAll`);
        setReportingperson(response.data.users);
      } catch (error) {
        console.log("Error fetching reporting data:", error);
      }
    };
    reporting();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false); 
    navigate("/"); 
  };


  return (
    <>
           <Header/>
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
                {formik.errors.name && (
                  <span className="text-danger">{formik.errors.name}</span>
                )}
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
                  type="text"
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
                <label>date of joining</label>

                <input
                  type="date"
                  className="form-control"
                  id="joining"
                  name="joining"
                  value={formik.values.joining}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-lg-4">
                <label>Reporting Person</label>
                <div className="input-group">
                  <select
                    className="form-control"
                    id="reporting"
                    name="reporting"
                    value={formik.values.reporting}
                    onChange={formik.handleChange}
                  >
                    <option value="">Select Reporting Person 🔽</option>
                    {reportingperson.map((person) => (
                      <option key={person._id} value={person.name}>
                        {person.name}
                      </option>
                    ))}
                  </select>
                </div>
                {formik.errors.reporting && (
                  <span className="text-danger">{formik.errors.reporting}</span>
                )}
              </div>

              <div className="col-lg-4">
                <label>experience</label>

                <input
                  type="number"
                  className="form-control"
                  id="expirience"
                  name="expirience"
                  value={formik.values.expirience}
                  onChange={formik.handleChange}
                />

                <span className="text-danger">{formik.errors.expirience}</span>
              </div>

              <div className="col-lg-4">
                <label>Salary</label>

                <input
                  type="number"
                  className="form-control"
                  id="salary"
                  name="salary"
                  value={formik.values.salary}
                  onChange={formik.handleChange}
                />

                <span className="text-danger">{formik.errors.salary}</span>
              </div>

              <div className="col-lg-4">
                <label>linkedin</label>
                <input
                  type="text"
                  className="form-control"
                  id="linkedin"
                  name="linkedin"
                  value={formik.values.linkedin}
                  onChange={formik.handleChange}
                />

                <span className="text-danger">{formik.errors.linkedin}</span>
              </div>

              <div className="col-lg-4">
                <label>Image</label>
                <input
                  type="file"
                  className="form-control"
                  name="image"
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
      <SuccessModal show={showModal} handleClose={handleCloseModal}/> 
    </>
  );
};

export default Addapplicants;
