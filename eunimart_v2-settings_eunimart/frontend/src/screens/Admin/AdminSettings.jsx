// import { TabPanel } from "@mui/lab";
import { Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./AdminSettings.css";
import AccountDetails from "../../SubScreens/AdminTabs/AccountDetails";
import ServiceAreaTab from "../../SubScreens/AdminTabs/ServiceAreaTab";
import KYCTab from "../../SubScreens/AdminTabs/KYCTab";
import BankDetailsTab from "../../SubScreens/AdminTabs/BankDetailsTab";
import ShippingTab from "../../SubScreens/AdminTabs/ShippingTab";
import { useDispatch, useSelector } from "react-redux";
import { loadAdminSettingsDataById } from "../../redux/action";

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
      {value === index && (
        <div sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const AdminSettings = ({}) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAdminSettingsDataById());
  }, []);
  const { adminSettingsView } = useSelector((state) => state.data);
  console.log("adminSettingsView", adminSettingsView);

  return (
    <>
      <div className="admn_settings_allbody">
        <div className="admn_settings_tabs">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Account Details " {...a11yProps(0)} />
            <Tab label="Bank Details" {...a11yProps(1)} />
            <Tab label="KYC" {...a11yProps(2)} />
            <Tab label="Serviceble area details" {...a11yProps(3)} />
            <Tab label="Shipping" {...a11yProps(4)} />
          </Tabs>
        </div>
        <div className="admn_settings_tabpanels">
          <TabPanel value={value} index={0}>
            {adminSettingsView && (
              <AccountDetails user_data={adminSettingsView} />
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {adminSettingsView && (
              <BankDetailsTab user_data={adminSettingsView} />
            )}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {adminSettingsView && <KYCTab user_data={adminSettingsView} />}
          </TabPanel>
          <TabPanel value={value} index={3}>
            {adminSettingsView && <ServiceAreaTab />}
          </TabPanel>
          <TabPanel value={value} index={4}>
            {adminSettingsView && <ShippingTab user_data={adminSettingsView} />}
          </TabPanel>
        </div>
      </div>
    </>
  );
};

export default AdminSettings;


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