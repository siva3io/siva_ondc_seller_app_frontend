import React from "react";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import "./MainPage.css";
import MultiPieChart from "./MultiPieChart";

const Reports = () => {
  const salesData = [
    {
      name: "Ecommerce Sales",
      color: "#416BFF",
      value: 35.8,
    },
    {
      name: "Retail Sales",
      color: "#649633",
      value: 34.2,
    },
    { name: "Crossborder Sales", value: 20, color: "#FABA1E" },

    { name: "Purchase Returns", value: 20, color: "#001661" },

    { name: "Sales Returns", value: 7.8, color: "#FC817C" },
  ];
  const orderData = [
    {
      name: "Sales Order",
      color: "#FABA1E",
      value: 34.2,
    },
    {
      name: "Purchase Order",
      color: "#CB7195",
      value: 35.8,
    },
    { name: "Delivery Order", value: 20, color: "#416BFF" },

    { name: "Purchase Returns", value: 7.8, color: "#54DFFF" },

    { name: "Sales Returns", value: 8, color: "#001661" },
  ];

  return (
    <div>
      <div>
        <div className=" container_2">
          {/* <div className="dashboard_footer">
            <div className="dashboard_calender">View Calender</div>
            <div>
              <AddCircleOutlineIcon className="dashboard_footer_add_icon" />
            </div>
          </div> */}

          <div className="dashboard_goals_title dashboard_container">
            Today’s Order vs Today’s Sales
          </div>
          <div>
            <input
              className="dashboard_reports_search_field"
              placeholder="Search Reports"
            />
          </div>

          <div className="dashboard_reports_calling_Container">
            <div className="dashboard_each_report_container">
              <MultiPieChart head="Today's Orders" data={orderData} />
            </div>
            <div className="dashboard_each_report_container">
              <MultiPieChart head="Today's Sales" data={salesData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;

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