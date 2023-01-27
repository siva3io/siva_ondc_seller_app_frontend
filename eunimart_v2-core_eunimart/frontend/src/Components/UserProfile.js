import React from "react";
import "./popup.css";
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import CachedRoundedIcon from '@mui/icons-material/CachedRounded';
import { useHistory } from "react-router-dom";

export default function UserProfile() {
    const navigate = useHistory();
    const userData = JSON.parse(localStorage.getItem("user_data"))
    console.log(userData,"userData")
    console.log("sampleSample")
    const logOut = () => {
        console.log("logOut");
        localStorage.clear();
        navigate.push("/login");
    
      };
  return (
    <div
    >
      <div className="modelContainer">
        <div className="profileContainer">
          <img
            // src={userData?.profile?.link}
            src="https://i.pinimg.com/736x/9e/b1/a3/9eb1a3d82f82eccc4489f9976c6badab.jpg"
            className="Bot_logo2"
            alt="Profile"
          />
          <h1 style={{ color: "black",margin:0 }}>{`${userData?.first_name} ${userData?.last_name}`}</h1>
          <h3 style={{ margin: 0, fontWeight: "500" }}>
          {userData?.email}
          </h3>
          <h3 style={{ margin: 0, fontWeight: "500" }}>
          {userData?.mobile_number}
          </h3>
          <div className="roleCon">
          {
            typeof userData?.user_types == "array"  && userData?.user_types?.map((o) => 
            <div className="roleNames">{o?.name}</div>
            )
          }
          </div>

          {/* <div className="roleCon">
            <div className="roleNames">Roles</div>
            <div className="roleNames">Roles</div>
          </div> */}
        </div>
        <div className="breakLine"></div>
        <div className="logoutBtnCon" style={{marginBottom:"2vh"}}>

        <div className="logoutBtn" onClick={logOut}>
            Logout
        </div>
        </div>
      </div>
    </div>
  );
}


/*
 Copyright (C) 2022 Eunimart Omnichannel Pvt Ltd. (www.eunimart.com)
 All rights reserved.
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Lesser General Public License v3.0 as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Lesser General Public License v3.0 for more details.
 You should have received a copy of the GNU Lesser General Public License v3.0
 along with this program.  If not, see <https://www.gnu.org/licenses/lgpl-3.0.html/>.
*/