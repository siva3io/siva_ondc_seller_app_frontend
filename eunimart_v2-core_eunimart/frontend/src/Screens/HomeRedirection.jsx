import React, { useState, useRef, useEffect } from "react";
import Home from "./Home";
import AdminHome from "./AdminHome";

const HomeRedirection = ({ setSessionId }) => {

    console.log(".", localStorage.getItem("user_data"))
    const userData = localStorage.getItem("user_data") !== "undefined" && localStorage.getItem("user_data") !== undefined && localStorage.getItem("user_data") !== null ? JSON.parse(localStorage.getItem("user_data")) : {};
    const userTypeValue =
    userData?.user_types && userData.user_types.length > 0 &&
    userData?.user_types[0]?.name.toUpperCase().includes("ADMIN")
      ? true
      : false;

    return (
        <>
            {
                userTypeValue ? <AdminHome setSessionId={setSessionId} /> : <Home setSessionId={setSessionId} />
            }
        </>
    )
};
export default HomeRedirection;

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