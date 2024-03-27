import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import { Link } from "react-router-dom";

const Allapplicants = () => {
  const [users, setUsers] = useState([]);
 

  const fetchData = async () => {
    try {
      const response = await axios.get("");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("");
      alert("datat deleted sucessfully");
      fetchData();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };




  return (
    <div className="container-fluid ">
      <div className="d-sm-flex align-items-center justify-content-between mb-4 mr-5">
        <h1 className="h3 mb-2 text-black mt-2 ml-3">Users Table </h1>
        <Link
          to="/adduser"
          className="d-none mt-2 d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        >
          <i className="fas fa-download fa-sm text-white-50"></i> Create User
        </Link>
      </div>
      <div className="card shadow bg-light">
        <div className="card-header bg-light">
          <div className="card-body">
            {users.length === 0 ? (
              <p>No matching Name found</p>
            ) : (
              <>
                <div
                  className="table-responsive"
                  style={{ maxHeight: "360px" }}
                >
                  <table
                    className="table table-bordered"
                    id="dataTable"
                    width="100%"
                  >
                    <thead className="position-sticky fixed-top">
                      <tr>
                        <th className="bg-success text-light"> ID</th>
                        <th className="bg-success text-light">Name</th>
                        <th className="bg-success text-light">Mobile No</th>
                        <th className="bg-success text-light"> Email</th>
                        <th className="bg-success text-light">department</th>
                        <th className="bg-success text-light">date of joining</th>
                        <th className="bg-success text-light">reporting</th>
                        <th className="bg-success text-light">expirience</th>
                        <th className="bg-success text-light">Salary</th>
                        <th className="bg-success text-light">linkedin</th>
                        <th className="bg-success text-light">Image</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((item, index) => (
                        <React.Fragment key={index}>
                          <tr>
                            <td>{item._id}</td>
                            <td>{item.name}</td>
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
                                <button
                                  className="btn btn-sm btn-danger"
                                  onClick={() => handleDelete(item._id)}
                                >
                                  delete
                                </button>
                                <Link to={`/edit-user/${item._id}`}>
                                  <button className="btn btn-sm btn-warning ml-2">
                                    edit
                                  </button>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Allapplicants;