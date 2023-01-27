import React, { useState } from "react";
import "./popup.css";
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import CachedRoundedIcon from '@mui/icons-material/CachedRounded';
import { useHistory } from "react-router-dom";



import { IconButton } from "@mui/material";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';




export default function NotificationPopUp() {
    const navigate = useHistory();
    const userData = JSON.parse(localStorage.getItem("user_data"))
    console.log(userData,"userData")
    console.log("sampleSample")
    const logOut = () => {
        console.log("logOut");
        localStorage.clear();
        navigate.push("/login");
    
      };

      const [list,setList] =useState(
        [
            {
                component:<DraftsOutlinedIcon />,
                title:"Order Received",
                content:"Order ID- #########",
                date:"25 Oct"

            },
            {
                component:<HeadsetMicOutlinedIcon />,
                title:"IGM ",
                content:"You order is on the way",
                date:"25 Oct"

            },
            {
                component:<ClassOutlinedIcon />,
                title:"Shipment",
                content:"You order is on the way",
                date:"25 Oct"

            },
            {
                component:<AdminPanelSettingsOutlinedIcon />,
                title:"Admin",
                content:"You order is on the way",
                date:"25 Oct"

            },
            {
                component:<svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.7083 17.5001C12.1596 17.5001 12.5431 17.3419 12.8588 17.0256C13.1751 16.71 13.3333 16.3265 13.3333 15.8751C13.3333 15.4237 13.1751 15.0402 12.8588 14.7246C12.5431 14.4082 12.1596 14.2501 11.7083 14.2501C11.2569 14.2501 10.8734 14.4082 10.5578 14.7246C10.2414 15.0402 10.0833 15.4237 10.0833 15.8751C10.0833 16.3265 10.2414 16.71 10.5578 17.0256C10.8734 17.3419 11.2569 17.5001 11.7083 17.5001ZM6.23742 17.4459L13.2791 10.4042L11.7624 8.88758L4.72075 15.9292L6.23742 17.4459ZM6.29159 12.0834C6.74297 12.0834 7.12647 11.9252 7.44209 11.6089C7.75842 11.2933 7.91659 10.9098 7.91659 10.4584C7.91659 10.007 7.75842 9.62352 7.44209 9.30791C7.12647 8.99158 6.74297 8.83341 6.29159 8.83341C5.8402 8.83341 5.4567 8.99158 5.14109 9.30791C4.82475 9.62352 4.66659 10.007 4.66659 10.4584C4.66659 10.9098 4.82475 11.2933 5.14109 11.6089C5.4567 11.9252 5.8402 12.0834 6.29159 12.0834ZM8.99992 21.8334C6.52631 21.8334 4.46364 20.9848 2.81192 19.2876C1.15947 17.5904 0.333252 15.4779 0.333252 12.9501C0.333252 11.1445 1.05114 9.18116 2.48692 7.06C3.92197 4.93811 6.09297 2.64036 8.99992 0.166748C11.9069 2.64036 14.0782 4.93811 15.514 7.06C16.9491 9.18116 17.6666 11.1445 17.6666 12.9501C17.6666 15.4779 16.8404 17.5904 15.1879 19.2876C13.5362 20.9848 11.4735 21.8334 8.99992 21.8334ZM8.99992 19.6667C10.8777 19.6667 12.4305 19.0305 13.6583 17.7579C14.886 16.4846 15.4999 14.882 15.4999 12.9501C15.4999 11.632 14.9539 10.1424 13.8619 8.48133C12.7692 6.82022 11.1485 5.00564 8.99992 3.03758C6.85131 5.00564 5.231 6.82022 4.139 8.48133C3.04628 10.1424 2.49992 11.632 2.49992 12.9501C2.49992 14.882 3.11381 16.4846 4.34159 17.7579C5.56936 19.0305 7.12214 19.6667 8.99992 19.6667Z" fill="#001661"/>
                </svg>,
                title:"Offers for BAP",
                content:"You order is on the way",
                date:"25 Oct"

            }

        ]
        ) 

  return (
    <div className="modelContainer">
      <div className="NotificationPopUpContainer">
       <div className="NotificationHeader">
            <span className="title">Notification</span>
            <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    sx={{
                      marginRight: 1,
                      color: "#001661",
                      // ...(open && { display: "contents"}),
                    }}
                  >
                    <SettingsOutlinedIcon />
                    
                  </IconButton>

        </div>

        {
          list?.map((item) => (
            <div className="NotificationListItem">
            <div className="iconDisplay">
              {/* <DraftsOutlinedIcon fontSize="large" /> */}
              {item?.component}
              </div>
            <div className="middleList">
                <span>{item?.title}</span>
                <span>{item?.content}</span>
            </div>
            <div>
                <span>{item?.date}</span>
            </div>
        </div>
            ))
        }
        {/* <div className="NotificationListItem">
            <div className="iconDisplay"><DraftsOutlinedIcon fontSize="large" /></div>
            <div className="middleList">
                <span>Order Received</span>
                <span>Order ID- #########</span>
            </div>
            <div>
                <span>25 Oct</span>
            </div>
        </div> */}
          
        <div className="NotificationViewAll">
        <div>
           View all Notification
          </div>
        </div>
          

      </div>
    </div>
  );
}


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