import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { config } from "../Api";
import Header from "./Header";

const Viewapplicants = () => {
  const { id } = useParams();
  const [user, setUser] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${config.Api}/api/getone/${id}`);
      const userData = response.data.users || [];
      setUser(Array.isArray(userData) ? userData : [userData]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <div className="shadow-lg mt-5">
          {user.map((item, index) => (
            <div key={index} className="">
              <h3>
                <b>Image</b> :{" "}
                <img src={item.image} alt="" height="200px" width="200px" />
              </h3>
              <h3>
                <b>ID</b> : {item._id}
              </h3>
              <h3>
                <b>Name</b> : {item.name}
              </h3>
              <h3>
                <b>Date of Birth</b> : {item.dob}
              </h3>
              <h3>
                <b>Email</b> : {item.email}
              </h3>
              <h3>
                <b>Department</b> : {item.department}
              </h3>
              <h3>
                <b>Date of Joining</b> : {item.joining}
              </h3>
              <h3>
                <b>Reporting</b> : {item.reporting}
              </h3>
              <h3>
                <b>Experience</b> : {item.expirience}
              </h3>
              <h3>
                <b>Salary</b> : ${item.salary}
              </h3>
              <h3>
                <b>LinkedIn</b> : {item.linkedin}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Viewapplicants;
