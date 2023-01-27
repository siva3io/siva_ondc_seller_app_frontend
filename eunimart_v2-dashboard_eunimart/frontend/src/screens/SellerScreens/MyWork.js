import React, { useState } from "react";
import "./MainPage.css";
import {
  Box,
  createTheme,
  Tab,
  Tabs,
  ThemeProvider,
  Typography,
} from "@mui/material";
import UpcomingTasks from "./UpcomingTasks";
import PendingApprovals from "./PendingApprovals";
import ToDoList from "./ToDoList";
import PropTypes from "prop-types";

const MyWork = () => {
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Typography>{children}</Typography>}
      </div>
    );
  }
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div className="">
        <p className="dashboard_subtitle_2">Work</p>
        <div>
          <Box sx={{ padding: "0px 16px" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              indicatorColor="black"
            >
              <Tab
                label="Upcoming Tasks"
                sx={{ fontSize: "16px", fontWeight: "bold" }}
              />
              <Tab
                label="Pending approvals"
                sx={{ fontSize: "16px", fontWeight: "bold" }}
              />
              <Tab
                label="To-do list"
                sx={{ fontSize: "16px", fontWeight: "bold" }}
              />
            </Tabs>
          </Box>
          <Box className="bundleViewContent">
            <TabPanel value={value} index={0}>
              <UpcomingTasks />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <PendingApprovals />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <ToDoList />
            </TabPanel>
          </Box>
        </div>
        {/* <div className="dashboard_sub_heads dashboard_container">
          
        </div> */}
      </div>
    </div>
  );
};

export default MyWork;

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