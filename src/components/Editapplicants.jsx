import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Header from "./Header";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../config/firebase";

const Editapplicants = () => {
  const { id } = useParams(); // Get the user id from the URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);



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
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setLoading(true); // Set loading to true when form submission starts
        await axios.put(
         "",
          values
        );
        alert("User data updated successfully");
        navigate("/dashboard");
      } catch (error) {
        console.error("Error updating user data:", error);
      } finally {
        setLoading(false); // Set loading back to false when form submission is complete
        setSubmitting(false);
      }
    },
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          ""
        );
        formik?.setValues(response.data); // Use optional chaining here
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);


  return (
    <>
      <Header />
      <h1 className="margin-top text-center">Edit User</h1>
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
    </>
  );
};

export default Editapplicants;