import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { config } from "../Api";
import Header from "./Header";

const Allapplicants = () => {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${config.Api}/api/getAll`);
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${config.Api}/api/delete/${id}`);
      alert("Data deleted successfully");
      fetchData();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
     <Header />
    <div className="container-fluid">
 
      <div className="card shadow bg-light mt-4">
        <div className="card-header bg-light">
          <div className="card-body">
            <div
              className="table-responsive"
              style={{ overflowX: "auto"}}
            >
              {users.length > 0 ? (
                <table className="table table-bordered" id="dataTable">
                  <thead className="position-sticky sticky-top">
                    <tr>
                      <th className="bg-success text-light">ID</th>
                      <th className="bg-success text-light">Name</th>
                      <th className="bg-success text-light">DOB</th>
                      <th className="bg-success text-light">Mobile No</th>
                      <th className="bg-success text-light">Email</th>
                      <th className="bg-success text-light">Department</th>
                      <th className="bg-success text-light">Date of Joining</th>
                      <th className="bg-success text-light">Reporting</th>
                      <th className="bg-success text-light">Experience</th>
                      <th className="bg-success text-light">Salary</th>
                      <th className="bg-success text-light">LinkedIn</th>
                      <th className="bg-success text-light">Image</th>
                      <th className="bg-success text-light">Created At</th>
                      <th className="bg-success text-light">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((item, index) => (
                      <tr key={index} className="user-row">
                        <td>{item._id}</td>
                        <td>{item.name}</td>
                        <td>{item.dob}</td>
                        <td>{item.mobileNo}</td>
                        <td>{item.email}</td>
                        <td>{item.department}</td>
                        <td>{item.joining}</td>
                        <td>{item.reporting}</td>
                        <td>{item.expirience}</td>
                        <td>{item.salary}</td>
                        <td>{item.linkedin}</td>
                        <td>
                          <img
                            src={item.image}
                            alt=""
                            height="100px"
                            width="100px"
                          />
                        </td>
                        <td>{item.createdAt}</td>
                        <td>
                          <div className="text-center">
                          <Link to={`/view-applicants/${item._id}`}>
                              <button className="btn btn-sm btn-info ml-2">
                                view
                              </button>
                            </Link>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(item._id)}
                            >
                              Delete
                            </button>
                            <Link to={`/edit-applicants/${item._id}`}>
                              <button className="btn btn-sm btn-warning ml-2">
                                Edit
                              </button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <h1>No Users Found</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Allapplicants;
