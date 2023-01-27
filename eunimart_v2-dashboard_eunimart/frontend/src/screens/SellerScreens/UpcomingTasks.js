import React, { useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./MainPage.css";

const tasks_fun = ({ task, startDate, dueDate, priority }) => {
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
      <p className=" box_2 content">{startDate}</p>
      <p className=" box_3 content">{dueDate}</p>
      <p className=" box_4 content">{priority}</p>
    </div>
  );
};

const tasks = [
  {
    task: "Set Up a meeting with Vendor in India",
    startDate: "12/05/2022",
    dueDate: "14/05/2022",
    priority: "High",
  },
  {
    task: "Attend meeting with Vendor in US",
    startDate: "12/05/2022",
    dueDate: "14/05/2022",
    priority: "High",
  },
  {
    task: "Review weekly Reports",
    startDate: "12/05/2022",
    dueDate: "14/05/2022",
    priority: "High",
  },
  {
    task: "Attend stakeholder meeting",
    startDate: "12/05/2022",
    dueDate: "14/05/2022",
    priority: "High",
  },
  {
    task: "Investors collab",
    startDate: "12/05/2022",
    dueDate: "14/05/2022",
    priority: "High",
  },
  {
    task: "Employee meeting",
    startDate: "12/05/2022",
    dueDate: "14/05/2022",
    priority: "High",
  },
  {
    task: "Add task",
    startDate: "12/05/2022",
    dueDate: "14/05/2022",
    priority: "Medium",
  },
];

const UpcomingTasks = () => {
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

          <div className="dashboard_container ">
            <div className="dashboard_container dashboard_table_head_container">
              <p className="dashboard_table_head box_1">Tasks</p>
              <p className="dashboard_table_head box_2">Start Date</p>
              <p className="dashboard_table_head box_3">Due Date</p>
              <p className="dashboard_table_head box_4">Priority</p>
            </div>

            {tasks.map((o) => {
              return tasks_fun({
                task: o.task,
                startDate: o.startDate,
                dueDate: o.dueDate,
                priority: o.priority,
              });
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingTasks;

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