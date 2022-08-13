import React from "react";
import "./styles.css";
import Header from "../../common/Header";
import SideBar from "../../common/SideBar";
import { Link, useNavigate } from "react-router-dom";

import Nav from "./Nav";

const Location = ({ user, data }) => {
  console.log("data is here", data);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    navigate("/property");
    const JsonResponse = await fetch("http://localhost:3002/property", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    });
    // console.log(data)
    const respose = await JsonResponse.json();
    console.log(respose);
    alert(respose.message);

    if (respose.status === "sucess") {
    } else {
      alert(respose.message);
    }
    // navigate("/Property")
  };

  return (
    <div className="basic">
      <SideBar />
      <div className="headform">
        <Header user={user} />
        <div className="rectangle"></div>

        <Nav />
        <div className="main">
          <form action="" className="form-basic" onSubmit={handleSubmit}>
            <div className="form-data1">
              <div className="form-container">
                <h4>Email</h4>
                <input type="text" placeholder="Email" className="input" />
                <h4>Area</h4>
                <select className="input" placeholder="select Area">
                  <option>mumbai</option>
                  <option>rajasthan</option>
                  <option>gujrat</option>
                </select>
                <h4>Address</h4>
                <input type="text" placeholder="Address" className="input" />
                <h4>Latitude</h4>
                <input type="text" placeholder="Latitude" className="input" />
              </div>

              <div className="form-container1">
                <h4>City</h4>
                <select className="input" placeholder="select City">
                  <option>delhi</option>
                  <option>goa</option>
                  <option>jammu</option>
                </select>
                <h4>Pincode</h4>
                <select className="input" placeholder="please select pincode">
                  <option>560035</option>
                  <option>560078</option>
                  <option>800023</option>
                </select>
                <h4>Landmark</h4>
                <input type="text" placeholder="Landmark" className="input" />
                <h4>Longitude</h4>
                <input type="text" placeholder="Longitude" className="input" />
              </div>
            </div>

            <div className="button">
              <Link to="/General">
                <button className="btn1 ">Previous</button>
              </Link>
              <button className="btn2">Add property</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Location;
