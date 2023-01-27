import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import "./Notification.css";



import { IconButton } from "@mui/material";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NotificationLabel from '../Components/NotificationLabel';
import { useState } from 'react';

export default function Notifications() {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [notificationData, setNotificationData] = useState(
    [
        {
          id: '1',
          message: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
          title:"Kristin Watson",
          time:"10min",
          profile:"",
          product:"https://images-na.ssl-images-amazon.com/images/I/71vdM21J5ZL._SL1500_.jpg",
          seen:false
        },
        {
            id: '2',
            message: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
            title:"Theresa Webb",
            time:"10min",
            profile:"",
            product:"https://i.pinimg.com/originals/2f/cb/de/2fcbde288a40c679d98e3ba9627be0e4.jpg",
          seen:true

          },
          {
            id: '3',
            message: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
            title:"Bessie Cooper",
            time:"17min",
            profile:"",
            product:"https://b-i.forbesimg.com/jasonevangelho/files/2013/06/Alienware-14-back-angle1.jpg",
          seen:false

          },
          {
            id: '4',
            message: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
            title:"Theresa Webb",
            time:"18min",
            profile:"",
            product:"https://techaeris.com/wp-content/uploads/2021/06/Alienware-x15-x17-gaming-laptops.jpg",
            seen:true
         
        },
          {
            id: '5',
            message: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
            title:"Theresa Webb",
            time:"20min",
            profile:"",
            product:"https://ae01.alicdn.com/kf/HTB13MqfavvsK1RjSspdq6AZepXaH/Plus-Size-4X-5X-Thick-Velvet-Zipper-Hoodies-Men-Autumn-Winter-Warm-Man-Hooded-Sweatshirt-Coat.jpg",
          seen:true

          },
          {
            id: '6',
            message: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
            title:"Theresa Webb",
            time:"18min",
            profile:"",
            product:"https://ae01.alicdn.com/kf/HTB13MqfavvsK1RjSspdq6AZepXaH/Plus-Size-4X-5X-Thick-Velvet-Zipper-Hoodies-Men-Autumn-Winter-Warm-Man-Hooded-Sweatshirt-Coat.jpg",
          seen:false

          },
          {
            id: '7',
            message: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
            title:"Theresa Webb",
            time:"20min",
            profile:"",
            product:"https://ae01.alicdn.com/kf/HTB13MqfavvsK1RjSspdq6AZepXaH/Plus-Size-4X-5X-Thick-Velvet-Zipper-Hoodies-Men-Autumn-Winter-Warm-Man-Hooded-Sweatshirt-Coat.jpg",
          seen:false

          }
    ]
  )


  return (
    <>
        <Box sx={{ background: "#F9F9F9",padding:"20px",width:"100vw",display:"flex",alignItems:"center",flexDirection:"column" }}>
            <div className='NotificationsHeader' style={{margin:"2vh 0",display:"flex",alignItems:"center" ,gap:"15px" ,color:"#1C1B1F",width:"95vw"}}> 
            <span className="title" >Notifications</span><NotificationsNoneOutlinedIcon fontSize='medium' />
            </div>

    <Box sx={{ width: '100%', typography: 'body1',display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column" }}>
      <TabContext value={value} >
        <Box sx={{ borderBottom: 1, borderColor: 'divider',background:"#fff",width:"95vw",borderRadius: "16px"}}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="All Notification " value="1" />
            <Tab label="Order Received" value="2" />
            <Tab label="IGM" value="3" />
            <Tab label="Admin" value="4" />
            <Tab label="Offers for BAP " value="5" />
            <Tab label="Shippment" value="6" />

          </TabList>
        </Box>
        <TabPanel value="1" >
            <div style={{display:"flex",flexDirection:"column",gap:"1vh",overflowY:"scroll",height:"80vh"}} >
                {
                    notificationData?.map((item)=>{
                        return <NotificationLabel props={item} />
                    })
                }
    
            </div>

        </TabPanel>

        <TabPanel value="2">
        <div style={{display:"flex",flexDirection:"column",gap:"1vh",overflowY:"scroll",height:"80vh"}} >
                {
                    
                    notificationData?.map((item)=>{
                        return <NotificationLabel props={item} />
                    })
                }
    
            </div>
        </TabPanel>
        <TabPanel value="3">
        <div style={{display:"flex",flexDirection:"column",gap:"1vh",overflowY:"scroll",height:"80vh"}} >
                {
                    
                    notificationData?.map((item)=>{
                        return <NotificationLabel props={item} />
                    })
                }
    
            </div>
        </TabPanel>
        <TabPanel value="4">
        <div style={{display:"flex",flexDirection:"column",gap:"1vh",overflowY:"scroll",height:"80vh"}} >
                {
                    
                    notificationData?.map((item)=>{
                        return <NotificationLabel props={item} />
                    })
                }
    
            </div>
        </TabPanel>
        <TabPanel value="5">
        <div style={{display:"flex",flexDirection:"column",gap:"1vh",overflowY:"scroll",height:"80vh"}} >
                {
                    
                    notificationData?.map((item)=>{
                        return <NotificationLabel props={item} />
                    })
                }
    
            </div>
        </TabPanel>
        <TabPanel value="6">
        <div style={{display:"flex",flexDirection:"column",gap:"1vh",overflowY:"scroll",height:"80vh"}} >
                {
                    
                    notificationData?.map((item)=>{
                        return <NotificationLabel props={item} />
                    })
                }
    
            </div>
        </TabPanel>
      </TabContext>
    </Box>
    </Box>
    </>
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