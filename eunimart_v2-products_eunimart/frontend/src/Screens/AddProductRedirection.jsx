import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import AddProduct from "./AddProduct";
import AddProductMDM from "./AddProductsMdm";


function AddProductRedirection({ edit }) {

    const ondcData = localStorage.getItem("ondc");
    console.log("ondc", ondcData)
    return (
        <>{
            ondcData == "true" ?  <AddProduct edit={edit} /> : <AddProductMDM edit={edit} />
        }
        </>
    )

}

export default AddProductRedirection;


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
