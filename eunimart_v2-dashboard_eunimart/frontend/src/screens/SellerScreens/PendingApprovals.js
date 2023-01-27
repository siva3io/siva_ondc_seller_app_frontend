import React, { useState } from "react";
import "./MainPage.css";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
const tasks_fun = ({ task }) => {
  const [flag, setFlag] = useState(false);
  const handleClick = () => {
    setFlag(!flag);
  };
  return (
    <div className="dashboard_container dashboard_table">
      <p className=" box_1 content icontext">
        <button className="dashboard_check_button" onClick={handleClick}>
          {flag ? (
            <CheckCircleIcon
              className="dashboard_circle_icon"
              fontSize="small"
              color={flag ? "success" : ""}
            />
          ) : (
            <CheckCircleOutlineIcon
              className="dashboard_circle_icon"
              fontSize="small"
            />
          )}
        </button>
        <div> {task}</div>
      </p>
    </div>
  );
};

const tasks = [
  { task: "Catalogue order line return approval" },
  { task: "New Customer Acquisition" },
  { task: "New Goal Sheet" },
  { task: "New customer" },
];

const PendingApprovals = () => {
  return (
    <div>
      <div>
        <div className=" container_2">
          <div className="dashboard_container ">
            <div className="dashboard_container dashboard_table_head_container">
              <p className="dashboard_table_head box_1">Tasks</p>
            </div>
            <div>
              {tasks.map((o) => {
                return tasks_fun({
                  task: o.task,
                });
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingApprovals;

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