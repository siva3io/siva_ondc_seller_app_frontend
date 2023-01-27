import React from "react";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import "./MainPage.css";
import DoublePieChart from "./DoublePieChart";

const Goals = () => {
  const options = [
    {
      tag: "Close $300,000 in total sales by the end of the current fiscal year.",
      achieved: 28,
      unachieved_color: "#416BFF",
      achieved_color: "#72AB3A",
    },
    {
      tag: "Close 15 new accounts in Q1.",
      achieved: 52,
      unachieved_color: "#416BFF",
      achieved_color: "#72AB3A",
    },
    {
      tag: "Reduce churn rate by 10 percent by the end of Q3.",
      achieved: 62,
      unachieved_color: "#416BFF",
      achieved_color: "#72AB3A",
    },
    {
      tag: "Generate over 70 percent of sales from clients X and Y for the month of November",
      achieved: 32,
      unachieved_color: "#416BFF",
      achieved_color: "#72AB3A",
    },
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

          <div className="dashboard_goals_title dashboard_container">Goals</div>
          <div className="dashboard_goals_boxes">
            {options.map((o) => {
              return (
                <DoublePieChart
                  tag={o.tag}
                  achieved={o.achieved}
                  unachieved_color={o.unachieved_color}
                  achieved_color={o.achieved_color}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals;

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