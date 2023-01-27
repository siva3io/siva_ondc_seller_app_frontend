import React, { useEffect, useState } from "react";
import SellerDashBoard from "./SellerScreens/SellerDashBoard";
import ApplicationDashboard from "./ApplicationScreens/ApplicationDashboard";
import { useDispatch, useSelector } from "react-redux";
import { load_dashboard_type } from "../redux/Actions/action";
import PayCardsPage from "./ApplicationScreens/PayCardsPage";
import BAPDashboard from "./BAPAdmin/BAPDashboard";
import BppDashboard from "./BPPAdmin/BPPDashboard";

const DashBoard = () => {
  const [seller, setSeller] = useState(false);
  const [bapAdmin, setBapAdmin] = useState(false);
  const [bppAdmin, setBppAdmin] = useState(false);
  const { dashboardTypeData } = useSelector(state => state.data);
  console.log(dashboardTypeData, "dashboardTypeDataaa");
  useEffect(() => {
    dashboardTypeData?.user_types &&
    dashboardTypeData?.user_types.length > 0 &&
    dashboardTypeData?.user_types[0]?.name.toUpperCase() == "SELLER"
      ? setSeller(true)
      : setSeller(false);
    dashboardTypeData?.user_types &&
    dashboardTypeData?.user_types.length > 0 &&
    dashboardTypeData?.user_types[0]?.name.toUpperCase() == "BAP_ADMIN"
      ? setBapAdmin(true)
      : setBapAdmin(false);
    dashboardTypeData?.user_types &&
    dashboardTypeData?.user_types.length > 0 &&
    dashboardTypeData?.user_types[0]?.name.toUpperCase() == "BPP_ADMIN"
      ? setBppAdmin(true)
      : setBppAdmin(false);
  }, [dashboardTypeData]);

  console.log(bapAdmin, "admins");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(load_dashboard_type());
  }, []);
  return (
    <div>
      <div>
        {seller ? (
          <SellerDashBoard />
        ) : bapAdmin ? (
          <BAPDashboard />
        ) : bppAdmin ? (
          <BppDashboard />
        ) : (
          <PayCardsPage />
        )}
      </div>
    </div>
  );
};

export default DashBoard;

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