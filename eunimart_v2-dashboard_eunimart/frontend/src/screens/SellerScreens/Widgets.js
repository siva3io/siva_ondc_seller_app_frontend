import React from "react";
import { Link } from "react-router-dom";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import WidgetsIcon from "@mui/icons-material/Widgets";
import SwitchAccessShortcutIcon from "@mui/icons-material/SwitchAccessShortcut";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import InsightsIcon from "@mui/icons-material/Insights";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import UpdateIcon from "@mui/icons-material/Update";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import HighlightAltIcon from "@mui/icons-material/HighlightAlt";
// import EachWidget from "./EachWidget";
import "./MainPage.css";

const eachWidget = ({ icon, head, description }) => {
  return (
    <div className="dashboard_widget">
      <div className="dashboard_widget_icon">{icon} </div>
      <div className="dashboard_widget_content">
        <p className="dashboard_widget_title">{head}</p>
        <p className="dashboard_widget_description">{description}</p>
      </div>
    </div>
  );
};

const Widgets = () => {
  const options = [
    {
      icon: (
        <NotificationsActiveIcon className="widget_icon" fontSize="large" />
      ),
      head: "Alerts",
      description: "Alerts set via modules/company settings",
    },
    {
      icon: <StarBorderIcon className="widget_icon" fontSize="large" />,
      head: "Favorites",
      description: "Modules/views favorited",
    },
    {
      icon: <WidgetsIcon className="widget_icon" fontSize="large" />,
      head: "Custom Page Filters",
      description: "",
    },
    {
      icon: (
        <SwitchAccessShortcutIcon className="widget_icon" fontSize="large" />
      ),
      head: "Screen Shortcuts",
      description: "To tasks, activities, pages ",
    },
    {
      icon: <ContentPasteIcon className="widget_icon" fontSize="large" />,
      head: "Business Reports/work snapshots",
      description: "Pre-generated and ready to share with your management",
    },
    {
      icon: <InsightsIcon className="widget_icon" fontSize="large" />,
      head: "Insights",
      description: "Best practices in the market, Trending",
    },
    {
      icon: <SettingsSuggestIcon className="widget_icon" fontSize="large" />,
      head: "Optimize",
      description: "AI driven Optimisation opportunities ",
    },
    {
      icon: <TipsAndUpdatesIcon className="widget_icon" fontSize="large" />,
      head: "Team and community updates",
      description: "To tasks, activities, pages ",
    },
    {
      icon: <UpdateIcon className="widget_icon" fontSize="large" />,
      head: "Periodic Reminders",
      description: "Alerts set via modules/company settings",
    },
    {
      icon: <AccessAlarmIcon className="widget_icon" fontSize="large" />,
      head: "Periodic Reminders",
      description: "Alerts set via modules/company settings",
    },
    {
      icon: <HighlightAltIcon className="widget_icon" fontSize="large" />,
      head: "Triggers",
      description: "",
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

          <div className="dashboard_widgets_title">
            Customize your experience with widgets
          </div>
          <div className="dashboard_widgets_container">
            {options.map((o) => {
              return eachWidget({
                icon: o.icon,
                head: o.head,
                description: o.description,
              });
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widgets;


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